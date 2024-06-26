"use client";
import React from "react";
import styles from "./page.module.scss";
import Background from "@/components/Background";
import { useFormik } from "formik";
import { useState } from "react";

const page = () => {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      setIsLoading(true);
      fetch(url, {
        method: "GET",
        body: JSON.stringify(values),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            setIsSubmited(true);
          });
        } else {
          r.json().then((err) => setError(err.error));
        }
      });
    },
  });

  return (
    <div className={styles.container}>
      <Background />

      <div className={styles.gradient}></div>
      <div className={styles.formContainer}>
        <h3>Sign in now</h3>
        <form className={styles.form}>
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
