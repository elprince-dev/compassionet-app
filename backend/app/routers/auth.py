from fastapi import APIRouter
from .. import oauth2, schemas, models

router = APIRouter(
    tags=['Authintication'],
    )

# @router.post('/signup', status_code)