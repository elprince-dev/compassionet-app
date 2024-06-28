from fastapi.security import OAuth2PasswordBearer
from .config import settings
from datetime import datetime, timedelta, timezone
import jwt
from .database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from .schemas import TokenData
from .models import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signin")

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def create_access_token(data: dict):
    to_incode = data.copy() #copy of the data
    expire = datetime.now(timezone.utc) + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES) #Setting the expiration time for the access  token
    to_incode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_incode, SECRET_KEY, algorithm= ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credential_exception = HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = f'Could not validate credentials', headers = {'WWW-Authenticate': 'Bearer'})

    token = verify_access_token(token, credential_exception)
    user = db.query(User).filter(User.id == token.id).first()
    return user

def verify_access_token(token: str, credential_exception):
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])
        id: str = payload.get('user_id')
        if not id:
            raise credential_exception
        token_data = TokenData(id=id) #constructing an instance from the schema class
    except jwt.PyJWTError:
        raise credential_exception
    
    return token_data