from passlib.context import CryptContext
from .config import settings
import boto3
from botocore.exceptions import NoCredentialsError
from fastapi import  HTTPException, status, UploadFile




#password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash(password: str):
    return pwd_context.hash(password)

#Verify password
def verify(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def upload_to_s3(file: UploadFile):
    
    s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_REGION)
    
    try:
        s3.upload_fileobj(file.file, settings.S3_BUCKET_NAME, file.filename)
        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file.filename}"
        return file_url
    except NoCredentialsError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not upload file")