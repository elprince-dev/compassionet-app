import React from "react";
import styles from "../styles/comment.module.scss";
import Image from "next/image";

const Comment = () => {
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
    <div className={styles.comment}>
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
      <div className={styles.commentContent}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nam
          ullam modi, harum quia ipsam eos dignissimos non eveniet veniam quam
          nostrum quod consequuntur reprehenderit fugit dolores numquam
          explicabo dolore!
        </p>
      </div>
    </div>
  );
};

export default Comment;
