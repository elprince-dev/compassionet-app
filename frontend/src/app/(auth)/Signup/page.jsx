"use client";
import React from "react";
import styles from "./page.module.scss";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";

const page = () => {
  return (
    <div className={styles.container}>
      <Signin />
      <Signup />
    </div>
  );
};

export default page;
