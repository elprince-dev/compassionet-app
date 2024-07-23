"use client";
import React, { useContext } from "react";
import styles from "./page.module.scss";
import UserContext from "@/constants/userContext";
import Image from "next/image";

const page = () => {
  const { user } = useContext(UserContext);
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
            <div className={styles.user}></div>
          </div>
          <div className={styles.bio}></div>
        </div>
      </div>
    </div>
  );
};

export default page;
