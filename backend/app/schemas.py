from pydantic import BaseModel, EmailStr
# from datetime import datetime
from typing import Optional
from fastapi import UploadFile, File
import datetime


class UserCreateResponse(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
class UserCreateInput(UserCreateResponse):
    bio: Optional[str] = None
    password: str
    confirm_password: str
    profile_pic: Optional[UploadFile] = File(None)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: int

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    profile_pic: str

class UserResponse(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    profile_pic: Optional[str] = None
class PostResponse(BaseModel):
    id: int
    content: str
    image: Optional[str] = None
    created_at: datetime.datetime
    owner: UserResponse
    likes: int
