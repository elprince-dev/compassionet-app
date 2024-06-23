import React from "react";
import styles from "../styles/menuElement.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MenuElement = ({ title, route }) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <div className={styles.container}>
      <a href={route} className={isActive ? styles.active : ""}>
        <Image
          key={title}
          src={`/${title}.svg`}
          alt={title}
          width={30}
          height={30}
        />
        <p>{title}</p>
      </a>
    </div>
  );
};

export default MenuElement;
