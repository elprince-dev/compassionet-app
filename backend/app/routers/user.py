import boto3
from botocore.exceptions import NoCredentialsError
from ..config import settings
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, UploadFile, File, Form
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


# Utility function to upload to S3
def upload_to_s3(file: UploadFile):
    s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_REGION)
    
    try:
        s3.upload_fileobj(file.file, settings.S3_BUCKET_NAME, file.filename)
        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file.filename}"
        return file_url
    except NoCredentialsError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not upload file")

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

