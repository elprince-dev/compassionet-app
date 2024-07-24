from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, BlacklistedToken
from ..utilities import verify
from ..schemas import Token
from ..oauth2 import create_access_token, oauth2_scheme


router = APIRouter(
    tags=['Authintication'],
    )

@router.post('/signin', response_model = Token)
async def signin(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # OAuth2PasswordRequestForm has username and password fields
    # When sending a request using postman, the username and password are sent as form-data
    print(user_credentials)
    user = db.query(User).filter(User.email == user_credentials.username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = 'User not found')
    if not verify(user_credentials.password, user.password):
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = 'Invalid credentials')
    access_token = create_access_token({'user_id': user.id})
    return {'access_token': access_token, 'token_type': 'bearer'}

router.post('/signout', status_code=status.HTTP_204_NO_CONTENT)
async def signout(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Add the token to the blacklist
    blacklisted_token = BlacklistedToken(token=token)
    db.add(blacklisted_token)
    db.commit()
    print("signed out")
    return {"detail": "Successfully signed out"}
    