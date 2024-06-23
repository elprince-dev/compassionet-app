import React from "react";
import styles from "../styles/haeder.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>CompassioNet</h1>
      </div>
      <div className={styles.user}>
        <div className={styles.image}>
          <Image
            src="/user.jpg"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <div className={styles.name}>
          <h3>username</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
