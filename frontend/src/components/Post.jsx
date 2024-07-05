"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/post.module.scss";
import Image from "next/image";
import Comment from "./Comment";

const Post = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  console.log(post.owner.profile_pic);
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.image}>
            <Image
              src={post.owner.profile_pic}
              width={50}
              height={50}
              alt="Picture of the user"
            />
          </div>
          <h4 className={styles.username}>Mohamed Hussein</h4>
          <div className={styles.time}>{post.created_at}</div>
        </div>
        {/* dropdown */}
        <div className={styles.dropdown}>
          <div className={styles.dropdownToggle} onClick={toggleDropdown}>
            <Image src="/dropDown.svg" width={30} height={30} alt="dropdown" />
          </div>
          {isOpen && (
            <div className={`${styles.dropdownMenu} ${isOpen ? "show" : ""}`}>
              <a href="#">Delete</a>
              <a href="#">Edit</a>
            </div>
          )}
        </div>
      </div>
      {/* Post Content */}
      <div className={styles.content}>
        <p>{post.content}</p>
        <div className={styles.image}>
          {post.image && <img src={post.image} alt="post image" />}
        </div>
      </div>
      {/* Buttons */}
      <div className={styles.actions}>
        <button className={styles.like}>Like</button>
        <button className={styles.iDidIt}>I did it!</button>
        <button className={styles.iWillDoIt}>I will do it</button>
        <button className={styles.iWillDoIt}>Share</button>
      </div>
      {/* Comments */}
      <input
        className={styles.writeComment}
        type="text"
        placeholder="Write a comment ..."
      />
      <div className={styles.comments}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Post;
