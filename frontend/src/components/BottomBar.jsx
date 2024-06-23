"use client";
import React from "react";
import styles from "../styles/bottomBar.module.scss";
import { links } from "../constants/index";
import MenuElement from "./MenuElement";

const BottomBar = () => {
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
        <MenuElement key="SignOut" title="Sign out" route="/SignIn" />
      </div>
    </div>
  );
};

export default BottomBar;
