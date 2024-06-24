from sqlalchemy import Column, String, Integer, LargeBinary, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship
from datetime import datetime


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable= False)
    last_name = Column(String, nullable= False)
    bio = Column(String, nullable=True)
    profile_pic = Column(String, nullable=True)
    created_at = Column(String, default=str(datetime.now()), nullable=False)

class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key = True, nullable=False)
    content = Column(String, nullable=False)
    image = Column(LargeBinary)
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    owner = relationship('User') #returns the owner attributes of the user who created the post

class Like(Base):
    __tablename__ = 'likes'
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key =True)
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE'), primary_key =True)
    created_at = Column(String, default=str(datetime.now()), nullable=False)

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key = True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    content = Column(String, nullable=False)
    created_at = Column(String, default=str(datetime.now()), nullable=False)
    
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key =True)

    

