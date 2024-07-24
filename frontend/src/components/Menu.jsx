"use client";
import React from "react";
import styles from "../styles/menu.module.scss";
import MenuElement from "./MenuElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { links } from "../constants/index";

const Menu = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const handleSignOut = async () => {
    try {
      // Call the signout endpoint if necessary
      const response = await fetch(baseURL + "/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the token from localStorage or cookies
        localStorage.removeItem("token");
        console.log(response.json());
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("An error occurred during sign out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => {
          return (
            <MenuElement
              key={link.title}
              title={link.title}
              route={link.route}
            />
          );
        })}
      </div>
      <div className={styles.signOut}>
        <MenuElement
          key="SignOut"
          title="Sign out"
          route="/Signin"
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
};

export default Menu;
