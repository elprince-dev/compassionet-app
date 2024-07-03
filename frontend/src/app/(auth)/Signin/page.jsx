"use client";
import React from "react";
import styles from "./page.module.scss";
import Background from "@/components/Background";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/signin";
  const url = `${baseURL}${endpoint}`;

  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("username", values.email);
      formData.append("password", values.password);

      fetch(url, {
        method: "POST",
        body: formData,
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            setIsSubmited(true);
            router.push("/");
            // console.log(data);
            localStorage.setItem("token", data.access_token);
          });
        } else {
          r.json().then((err) => {
            setError(err.error);
            console.log(error);
          });
        }
      });
    },
  });

  return (
    <div className={styles.container}>
      <Background />

      <div className={styles.gradient}></div>
      <div className={styles.formContainer}>
        <h3>Sign in to CompassioNet</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
              autoComplete="off"
              value={values.email}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
              autoComplete="off"
              value={values.password}
            />
          </div>
          <button type="submit">{isLoading ? "Loading..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
};

export default page;
