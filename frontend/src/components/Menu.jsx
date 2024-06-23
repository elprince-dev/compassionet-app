"use client";
import React from "react";
import styles from "../styles/menu.module.scss";
import MenuElement from "./MenuElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { links } from "../constants/index";

const Menu = () => {
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

export default Menu;
