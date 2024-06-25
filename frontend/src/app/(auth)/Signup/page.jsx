"use client";
import React from "react";
import styles from "./page.module.scss";
import Signup from "@/components/Signup";
import SigninDirecting from "@/components/SigninDirecting";

const page = () => {
  return (
    <div className={styles.container}>
      <SigninDirecting />
      <Signup />
    </div>
  );
};

export default page;
