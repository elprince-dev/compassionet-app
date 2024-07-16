import React from "react";
import styles from "../styles/comment.module.scss";
import Image from "next/image";

const Comment = ({ commentData }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        <div className={styles.image}>
          <Image
            src={commentData.owner.profile_pic} //
            width={50}
            height={50}
            alt="Picture of the user"
          />
        </div>
        <h4 className={styles.username}>
          {commentData.owner.first_name} {commentData.owner.last_name}
        </h4>

        <div className={styles.time}>
          <p>{new Date(commentData.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles.commentContent}>
        <p>{commentData.content}</p>
      </div>
    </div>
  );
};

export default Comment;
