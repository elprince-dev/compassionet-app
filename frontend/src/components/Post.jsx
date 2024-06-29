"use client";
import React, { useState } from "react";
import styles from "../styles/post.module.scss";
import Image from "next/image";

const Post = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  function getCurrentDate() {
    let currentDateTime = new Date();
    let day = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1; // Months are zero-based, so add 1
    let year = currentDateTime.getFullYear();

    // Format day and month with leading zeros if necessary
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return `${day}-${month}-${year}`;
  }
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.image}>
            <Image
              src="/user.jpg"
              width={50}
              height={50}
              alt="Picture of the user"
            />
          </div>
          <h4 className={styles.username}>Mohamed Hussein</h4>
          <div className={styles.time}>{getCurrentDate()}</div>
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
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
          autem facilis ex commodi enim? Necessitatibus enim laboriosam
          cupiditate eaque dolor rerum numquam repellendus explicabo possimus
          ratione, nostrum animi minima tempore.
        </p>
        <div className={styles.image} onClick={toggleDropdown}>
          <img src="/user.jpg" alt="post image" />
        </div>
      </div>
      {/* Buttons */}
      <div className={styles.actions}>
        <div className={styles.like}>Like</div>
        <div className={styles.reply}>Reply</div>
      </div>
      {/* Comments */}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <div className={styles.image}>User Image</div>
            <div className={styles.username}>User Name</div>
          </div>
          <div className={styles.commentContent}>Comment Content</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
