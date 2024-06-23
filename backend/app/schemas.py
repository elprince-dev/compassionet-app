from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from fastapi import UploadFile


class UserCreateResponse(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
class UserCreateInput(UserCreateResponse):
    bio: Optional[str] = None
    password: str
    confirm_password: str
    profile_pic: Optional[bytes] = None

