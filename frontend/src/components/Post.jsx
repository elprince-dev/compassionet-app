"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/post.module.scss";
import Image from "next/image";
import Comment from "./Comment";
import { updateLikes } from "@/constants/functions";

const Post = ({ post }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/posts/";
  const url = `${baseURL}${endpoint}${post.id}`;

  const [isOpen, setIsOpen] = useState(false);
  const [count, SetCount] = useState({
    like: post.likes_count,
    iDidIt: 0,
    iWillDoIt: 0,
  });

  // setKey function

  const [active, setActive] = useState({
    like: post.is_like,
    iDidIt: post.is_i_did_it,
    iWillDoIt: post.is_i_will_do_it,
  });
  console.log(post);
  let setKey = (key, bool) => {
    setActive((prevActive) => ({
      ...prevActive,
      [key]: bool,
    }));
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClick = async (e) => {
    try {
      const result = await updateLikes(url + "?action=" + e.target.id);
      console.log(url + "?action=" + e.target.id);
      if (result.message === "Post is actioned") {
        setKey(e.target.id, true);
      } else {
        setKey(e.target.id, false);
      }
      SetCount((prevState) => ({
        ...prevState,
        [e.target.id]: result.actions,
      }));
    } catch (error) {
      console.error("Failed to like/unlike the post", error);
    }
  };
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
          <h4
            className={styles.username}
          >{`${post.owner.first_name} ${post.owner.last_name}`}</h4>
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
        <button
          className={`${styles.like} ${active.like ? styles.active : ""}`}
          id="like"
          onClick={handleClick}
        >
          Like
          <span>{count.like}</span>
        </button>
        <button
          className={`${styles.iDidIt} ${active.iDidIt ? styles.active : ""}`}
          id="iDidIt"
          onClick={handleClick}
        >
          I did it!<span>{count.iDidIt}</span>
        </button>
        <button
          className={`${styles.iWillDoIt} ${
            active.iWillDoIt ? styles.active : ""
          }`}
          id="iWillDoIt"
          onClick={handleClick}
        >
          I will do it<span>{count.iWillDoIt}</span>
        </button>
        <button className={styles.share}>Share</button>
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
