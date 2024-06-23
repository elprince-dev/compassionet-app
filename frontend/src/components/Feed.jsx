import React from "react";
import styles from "../styles/feed.module.scss";
import Post from "./Post";

const Feed = () => {
  return (
    <div className={styles.container}>
      <Post />
      
    </div>
  );
};

export default Feed;
