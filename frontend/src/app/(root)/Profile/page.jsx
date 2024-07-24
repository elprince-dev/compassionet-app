"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "./page.module.scss";
import UserContext from "@/constants/userContext";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { IoMdDoneAll } from "react-icons/io";
import { fetchPostsByUser } from "@/constants/functions";
import Post from "@/components/Post";

const page = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("acts"); // Default active tab
  const [myPosts, setMyPosts] = useState(null); // Default
  const renderContent = () => {
    switch (activeTab) {
      case "acts":
        return (
          <>
            {myPosts &&
              myPosts.map((post) => <Post post={post} key={post.id} />)}
          </>
        );
      case "todo":
        return <div>To Do Content</div>;
      case "done":
        return <div>Done Content</div>;
      default:
        return null;
    }
  };

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/posts/user/${user.id}`;
  const url = `${baseURL}${endpoint}`;

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPostsByUser(url);
      setMyPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.image}>
              <Image
                src={user.profile_pic}
                width={90}
                height={90}
                alt="Picture of the user"
              />
            </div>
            <div className={styles.user}>
              <h2>
                {user.first_name} {user.last_name}
              </h2>
              <p>@{user.username}</p>
            </div>
          </div>
          <div className={styles.bio}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo,
              sint nam. Quae, similique odio culpa magni cumque aliquid
              voluptatum quidem perspiciatis exercitationem impedit tenetur
              assumenda nesciunt distinctio fugiat natus adipisci?{user.bio}
            </p>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.icons}>
          <div
            className={`${styles.icon} ${
              activeTab === "acts" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("acts")}
          >
            <FaRegCommentDots />
            <h4>My Acts</h4>
          </div>
          <div
            className={`${styles.icon} ${
              activeTab === "todo" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("todo")}
          >
            <LuListTodo />
            <h4>To Do</h4>
          </div>
          <div
            className={`${styles.icon} ${
              activeTab === "done" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("done")}
          >
            <IoMdDoneAll />
            <h4>Done</h4>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.posts}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
