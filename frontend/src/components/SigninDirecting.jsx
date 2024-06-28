import React from "react";
import styles from "../styles/signinDirecting.module.scss";
import { useRouter } from "next/navigation";

const SigninDirecting = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <h3>Welcome Back</h3>
        <p>Sign in with your creditential to connect with friends</p>
        <button type="submit" onClick={() => router.push("/Signin")}>
          Sign In
        </button>
      </div>
      {/* Background Code */}
      <div class={styles.background}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* -------------------- */}
    </>
  );
};

export default SigninDirecting;
