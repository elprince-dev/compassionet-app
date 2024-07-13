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

    #relationship with created posts
    posts = relationship('Post', back_populates='owner', cascade="all, delete, save-update") #relationship with user_id in Post

    # liked_posts = relationship('Post', secondary='likes', back_populates='liked_by_users')

    #relationship with likes
    likes = relationship('Like', back_populates="liking_user", cascade='all, delete, save-update')

    #relationship with comments
    comments = relationship('Comment', back_populates='owner', cascade='all, delete, save-update')

    #relationship with I did its
    i_did_its = relationship('I_did_it', back_populates='owner', cascade='all, delete, save-update')

    #relationship with I will do its
    i_will_do_its = relationship('I_will_do_it', back_populates='owner', cascade='all, delete, save-update')


class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key = True, nullable=False)
    content = Column(String, nullable=False)
    image = Column(String, nullable=True)
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    #reltionship with post owner
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False) # relationship with User model
    owner = relationship('User', back_populates= 'posts') #returns the owner attributes of the user who created the post

    #relatinoship with likes
    likes = relationship('Like', back_populates='post', cascade='all, delete, save-update')

    #relationship with I did its
    i_did_its = relationship('I_did_it', back_populates='post', cascade='all, delete, save-update')

    #relationship with I will do its
    i_will_do_its = relationship('I_will_do_it', back_populates='post', cascade='all, delete, save-update')

    #relationship with comments
    comments = relationship('Comment', back_populates='post', cascade='all, delete, save-update')

    # liked_by_users = relationship('User', secondary='likes', back_populates='liked_posts')

    # likes = Column(Integer, default=0)

class Like(Base):
    __tablename__ = 'likes'
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    #relationship with the liking user
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key =True)
    liking_user = relationship('User', back_populates='likes')

    #relationship with the post
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key =True)
    post = relationship('Post', back_populates='likes')
    

    # post = relationship('Post', back_populates='likes')

class I_did_it(Base):
    __tablename__ = 'i_did_it'
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    #relationship with the owner of the I did it
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key =True)
    owner = relationship('User', back_populates='i_did_its')

    #relationship with post
    post = relationship('Post', back_populates='i_did_its')
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE'), primary_key =True)

class I_will_do_it(Base):
    __tablename__ = 'i_will_do_it'
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    #relationship with the owner of the I will do it
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key =True)
    owner = relationship('User', back_populates='i_will_do_its')

    #relationship with post
    post = relationship('Post', back_populates='i_will_do_its')
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key =True)

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key = True, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(String, default=str(datetime.now()), nullable=False)

    #relationship with comment owner
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'))
    owner = relationship('User', back_populates='comments')
    
    #relationship with post
    post = relationship('Post', back_populates='comments')
    post_id = Column(Integer, ForeignKey('posts.id', ondelete='CASCADE', onupdate='CASCADE'))

    

