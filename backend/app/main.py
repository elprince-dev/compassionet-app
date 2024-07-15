from . import models
from .database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import post, user, like, auth, comment

#Create models and fastapi app
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

#routers
app.include_router(post.router)
app.include_router(user.router)
app.include_router(like.router)
app.include_router(auth.router)
app.include_router(comment.router)


## Set Access
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
