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
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    profile_pic: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True
class PostResponse(BaseModel):
    id: int
    content: str
    image: Optional[str] = None
    created_at: datetime.datetime
    owner: UserResponse
    like_count: int
    i_did_it_count: int
    i_will_do_it_count: int
    is_like: bool
    is_i_did_it: bool
    is_i_will_do_it: bool

    class Config:
        from_attributes = True
