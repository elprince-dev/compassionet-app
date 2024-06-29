import React from "react";
import styles from "../styles/feed.module.scss";
import Post from "./Post";
import AddPost from "./AddPost";

const Feed = () => {
  return (
    <div className={styles.feed}>
      <AddPost />
      <div className={styles.posts}>
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
