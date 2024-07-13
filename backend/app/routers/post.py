from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, UploadFile, File, Form, Response
from typing import Optional
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, utilities, oauth2
from ..utilities import upload_to_s3
from typing import List
from sqlalchemy.orm import joinedload


router = APIRouter(
    prefix='/posts',
    tags=['Posts'],
    )

@router.post('/create_post', status_code = status.HTTP_201_CREATED)
async def create_post(content: str = Form(...), image: Optional[UploadFile] = File(None), db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    image_url = None
    if image:
        image_url = upload_to_s3(image)
    new_post = models.Post(content=content, image=image_url, user_id=current_user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get('/', response_model=List[schemas.PostResponse])
async def read_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).options(joinedload(models.Post.owner)).order_by(models.Post.id.desc()).all()
    return posts

@router.post('/{id}')
async def like_post(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = 'Post not found')
    
    # Update likes count in the Post table
    like_row = db.query(models.Like).filter(models.Like.post_id == id, models.Like.user_id == current_user.id).first()
    if like_row:
        db.delete(like_row)
        post.likes -= 1
        db.commit()
        db.refresh(post)
        return {"message": "Post is unliked", "likes": post.likes}

    post.likes += 1
    # Create a new Like record
    like = models.Like(user_id = current_user.id, post_id = id)
    db.add(like)
    db.commit()
    db.refresh(post)
    print(post)
    return {"message": "Post is liked", "likes": post.likes}
    
