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

      <div className={styles.writePost}>
        <input type="text" placeholder="Write a comment ..." />
        <button>
          <a>
            <Image src="/upload.svg" width={20} height={20} alt="Upload" />
            <p>Add a photo </p>
          </a>
        </button>
      </div>
    </div>
  );
};

export default AddPost;
