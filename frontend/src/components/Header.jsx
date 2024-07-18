"use client";
import React, { useContext } from "react";
import styles from "../styles/haeder.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/constants/functions";
import UserContext from "@/constants/userContext";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/user/me";
const url = `${baseURL}${endpoint}`;

const Header = () => {
  const { user } = useContext(UserContext);

  //the below lines are only used if UseContext is not used
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     const data = await fetchUserProfile(url);
  //     setUser(data);
  //   };
  //   getUserProfile();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>CompassioNet</h1>
      </div>
      <div className={styles.user}>
        {user && (
          <div className={styles.image}>
            <img
              src={`${user.profile_pic}`}
              width={50}
              height={50}
              alt="Picture of the user"
            />
          </div>
        )}
        <div className={styles.name}>{user && <h3>{user.username}</h3>}</div>
      </div>
    </div>
  );
};

export default Header;
