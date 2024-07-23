"use client";
import React, { useContext } from "react";
import styles from "./page.module.scss";
import UserContext from "@/constants/userContext";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { IoMdDoneAll } from "react-icons/io";

const page = () => {
  const { user } = useContext(UserContext);
  console.log(user);
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
          <div className={styles.icon}>
            <FaRegCommentDots />
            <h4>My Acts</h4>
          </div>
          <div className={styles.icon}>
            <LuListTodo />
            <h4>To Do</h4>
          </div>
          <div className={styles.icon}>
            <IoMdDoneAll />
            <h4>Done</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
