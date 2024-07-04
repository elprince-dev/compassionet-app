import boto3
from botocore.exceptions import NoCredentialsError
from ..config import settings
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, UploadFile, File, Form
from .. import models, schemas, utilities, oauth2
from ..database import get_db
from sqlalchemy.orm import Session
from typing import Optional
from ..utilities import upload_to_s3

router = APIRouter(
    tags=['Users'],
    )

@router.get('/')
async def get_user():
    return {"data": "hello world"}


# Utility function to upload to S3


@router.post('/signup', status_code = status.HTTP_201_CREATED)
async def create_user(
    first_name: str = Form(...),
    last_name: str = Form(...),
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    bio: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None), db: Session = Depends(get_db) ):
    
    #hash password
    hashed_password = utilities.hash(password)


    profile_pic_url = None
    if profile_pic:
        profile_pic_url = upload_to_s3(profile_pic)

    #post user
    new_user = models.User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        bio=bio,
        profile_pic=profile_pic_url,
        username=username
    )

    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    print(new_user)

    return new_user

@router.get("/user/me", response_model=schemas.UserResponse)
async def read_current_user(current_user: models.User = Depends(oauth2.get_current_user)):
    return current_user

