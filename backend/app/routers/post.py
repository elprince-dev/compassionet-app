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

# response_model=List[schemas.PostResponse]
@router.get('/',  response_model=List[schemas.PostResponse]
)
async def read_posts(db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    posts = db.query(models.Post).options(joinedload(models.Post.owner)).order_by(models.Post.id.desc()).all()

    post_responses = []

    for post in posts:
        like_count = db.query(models.Like).filter(models.Like.post_id == post.id).count()
        is_like = db.query(models.Like).filter(models.Like.post_id == post.id, models.Like.user_id == current_user.id).first() is not None

        i_did_it_count = db.query(models.I_did_it).filter(models.I_did_it.post_id == post.id).count()
        is_i_did_it = db.query(models.I_did_it).filter(models.I_did_it.post_id == post.id, models.I_did_it.user_id == current_user.id).first() is not None

        i_will_do_it_count = db.query(models.I_will_do_it).filter(models.I_will_do_it.post_id == post.id).count()
        is_i_will_do_it = db.query(models.I_will_do_it).filter(models.I_will_do_it.post_id == post.id, models.I_will_do_it.user_id == current_user.id).first() is not None

        #Serializing the owner to match the pydantic model format 
        owner = schemas.UserResponse.from_orm(post.owner)


        post_response = schemas.PostResponse(
            id=post.id,
            content=post.content,
            image=post.image,
            created_at=post.created_at,
            owner=owner,
            like_count=like_count,
            i_did_it_count=i_did_it_count,
            i_will_do_it_count=i_will_do_it_count,
            is_like=is_like,
            is_i_did_it=is_i_did_it,
            is_i_will_do_it=is_i_will_do_it,         
        )
        post_responses.append(post_response)
        print(post_responses)
    return post_responses

@router.post('/{id}')
async def action_post(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user), action: Optional[str] = ''):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = 'Post not found')
    
    if action == 'like':
        #define like counts
        like_count = db.query(models.Like).filter(models.Like.post_id == id).count()
        
        # Update likes count in the Post table
        like_row = db.query(models.Like).filter(models.Like.post_id == id, models.Like.user_id == current_user.id).first()
        if like_row:
            db.delete(like_row)
            like_count -= 1
            db.commit()
            db.refresh(post)
            return {"message": "Post is unliked", "actions": like_count}

        like_count += 1
        # Create a new Like record
        like = models.Like(user_id = current_user.id, post_id = id)
        db.add(like)
        db.commit()
        db.refresh(post)
        print(post)
        return {"message": "Post is actioned", "actions": like_count}
    
    elif action == 'iDidIt':
        #define iDidit counts
        i_did_it_count = db.query(models.I_did_it).filter(models.I_did_it.post_id == id).count()
        
        # Update iDidit count in the Post table
        i_did_it_row = db.query(models.I_did_it).filter(models.I_did_it.post_id == id, models.I_did_it.user_id == current_user.id).first()
        if i_did_it_row:
            db.delete(i_did_it_row)
            i_did_it_count -= 1
            db.commit()
            db.refresh(post)
            return {"message": "Post is unactioned", "actions": i_did_it_count}

        i_did_it_count += 1
        # Create a i_did_it Like record
        i_did_it = models.I_did_it(user_id = current_user.id, post_id = id)
        db.add(i_did_it)
        db.commit()
        db.refresh(post)
        print(post)
        return {"message": "Post is actioned", "actions": i_did_it_count}
    
    elif action == 'iWillDoIt':
        #define iWillDoIt counts
        i_will_do_it_count = db.query(models.I_will_do_it).filter(models.I_will_do_it.post_id == id).count()
        
        # Update iWillDoIt count in the Post table
        i_will_do_it_row = db.query(models.I_will_do_it).filter(models.I_will_do_it.post_id == id, models.I_will_do_it.user_id == current_user.id).first()
        if i_will_do_it_row:
            db.delete(i_will_do_it_row)
            i_will_do_it_count -= 1
            db.commit()
            db.refresh(post)
            return {"message": "Post is unactioned", "actions": i_will_do_it_count}

        i_will_do_it_count += 1
        # Create a iWillDoIt  record
        i_will_do_it = models.I_will_do_it(user_id = current_user.id, post_id = id)
        db.add(i_will_do_it)
        db.commit()
        db.refresh(post)
        print(post)
        return {"message": "Post is actioned", "actions": i_will_do_it_count}
    
