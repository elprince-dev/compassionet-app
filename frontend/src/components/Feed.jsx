"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/feed.module.scss";
import Post from "./Post";
import AddPost from "./AddPost";
import { fetchPosts } from "@/constants/functions";

const Feed = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/posts/";
  const url = `${baseURL}${endpoint}`;

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(url);
      setPosts(data);
    };
    getPosts();
  }, [refresh]);

  return (
    <div className={styles.feed}>
      <AddPost onRefresh={triggerRefresh} />
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
