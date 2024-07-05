"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/feed.module.scss";
import Post from "./Post";
import AddPost from "./AddPost";

const Feed = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/posts/";
  const url = `${baseURL}${endpoint}`;

  const [posts, setPosts] = useState([]);

  const fetchPosts = async (url) => {
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError("Failed to fetch user profile");
      });
  };
  useEffect(() => {
    fetchPosts(url);
  }, []);
  console.log(posts);
  return (
    <div className={styles.feed}>
      <AddPost />
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
