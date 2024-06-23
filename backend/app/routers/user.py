import boto3
from ..config import settings
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, UploadFile, File
from .. import models, schemas, utilities
from ..database import get_db
from sqlalchemy.orm import Session
from typing import Optional

router = APIRouter(
    tags=['Users'],
    )

@router.get('/')
async def get_user():
    return {"data": "hello world"}


s3_client = boto3.client(
    's3',
    aws_access_key_id= settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key= settings.AWS_SECRET_ACCESS_KEY,
    region_name='us-east-1'
)

BUCKET_NAME = 'compassionetprofilepic'

@router.post('/signup', status_code = status.HTTP_201_CREATED, response_model = schemas.UserCreateResponse)
async def create_user(user: schemas.UserCreateInput, db: Session = Depends(get_db) ):
    
    
    #hash password
    hashed_password = utilities.hash(user.password)
    user.password = hashed_password


    if user.profile_pic:
        profile_pic_data = await user.profile_pic.read()
        file_extension = user.profile_pic.filename.split('.')[-1]
        s3_file_name = f"{user.username}.{file_extension}"

        try:
            s3_client.put_object(
                Bucket=BUCKET_NAME,
                Key=s3_file_name,
                Body=profile_pic_data,
                ContentType=user.profile_pic.content_type
            )
            profile_pic_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_file_name}"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error uploading image: {str(e)}")
    else:
        profile_pic_url = None

    #post user
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password,
        bio=user.bio,
        profile_pic=profile_pic_url,
        username=user.username
    )

    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    print(new_user)

    return new_user

