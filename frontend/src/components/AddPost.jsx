"use client";
import React, { useState, useRef } from "react";
import styles from "../styles/addPost.module.scss";
import Image from "next/image";
import { useFormik } from "formik";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/posts/create_post";
const url = `${baseURL}${endpoint}`;

const AddPost = ({ onRefresh, currentUser }) => {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const imageUploadRef = useRef(null);
  const contentRef = useRef(null);
  const [imageName, setImageName] = useState(null);

  const initialValues = {
    content: "",
    image: "",
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async (e) => {
      setIsLoading(true);

      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      console.log(formData);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setIsSubmited(true);

        const data = await response.json();
        setIsLoading(false);
        onRefresh();
      } catch (err) {
        throw new Error("Failed to add a post");
      }
      //resetting the form
      setFieldValue("content", "");
      setImageName("");
    },
  });
  const handleImageChange = (e) => {
    setFieldValue("image", e.target.files[0]);
    console.log("File change event:", e);
    console.log(e.target.files[0].name);
    setImageName(e.target.files[0].name);
  };
  const handleImageClick = (e) => {
    e.preventDefault();
    imageUploadRef.current.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={currentUser.profile_pic}
          width={50}
          height={50}
          alt="Picture of the user"
        />
      </div>

      <form className={styles.writePost}>
        <input
          id="content"
          placeholder="Share your act . . . "
          ref={contentRef}
          type="text"
          autoComplete="off"
          value={values.content}
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          <button className={styles.addPhoto} onClick={handleImageClick}>
            <a>
              <Image src="/upload.svg" width={20} height={20} alt="Upload" />
              <p>Add a photo </p>
            </a>
          </button>
          <input
            type="file"
            id="image"
            ref={imageUploadRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <p className={styles.addedImageName}>{imageName}</p>
          <div className={styles.post} type="submit" onClick={handleSubmit}>
            <a>
              <p>{isLoading ? "Posting..." : "Post"}</p>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
