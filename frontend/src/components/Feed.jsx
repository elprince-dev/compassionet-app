"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/feed.module.scss";
import Post from "./Post";
import AddPost from "./AddPost";
import { fetchPosts, fetchUserProfile } from "@/constants/functions";
import UserContext from "@/constants/userContext";

const Feed = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/posts/";
  const url = `${baseURL}${endpoint}`;

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(url);
      setPosts(data);
    };
    getPosts();

    //the below code is valid only when we didn't use userContext

    // const getUserProfile = async () => {
    //   const data = await fetchUserProfile(baseURL + "/user/me");
    //   setUser(data);
    // };
    // getUserProfile();
  }, [refresh]);

  return (
    <div className={styles.feed}>
      <AddPost onRefresh={triggerRefresh} currentUser={user} />
      <div className={styles.posts}>
        {posts && posts.map((post) => <Post post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default Feed;
