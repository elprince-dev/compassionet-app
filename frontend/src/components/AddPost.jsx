import React from "react";
import styles from "../styles/addPost.module.scss";
import Image from "next/image";

const AddPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src="/user.jpg"
          width={50}
          height={50}
          alt="Picture of the user"
        />
      </div>

      <input
        className={styles.writePost}
        type="text"
        placeholder="Write a comment ..."
      />
    </div>
  );
};

export default AddPost;
