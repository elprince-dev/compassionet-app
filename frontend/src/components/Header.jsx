"use client";
import React from "react";
import styles from "../styles/haeder.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/user/me";
const url = `${baseURL}${endpoint}`;

const Header = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const fetchUserProfile = async (url) => {
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
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        setError("Failed to fetch user profile");
      });
  };

  useEffect(() => {
    fetchUserProfile(url);
  }, []);

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
