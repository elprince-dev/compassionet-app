import React from "react";
import styles from "../styles/addPost.module.scss";
import Image from "next/image";
import { useFormik } from "formik";
import { useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/posts/create_post";
const url = `${baseURL}${endpoint}`;

const AddPost = ({ onRefresh }) => {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const initialValues = {
    content: "",
    // image: null,
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      setIsLoading(true);

      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
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
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src="/user.jpg"
          width={50}
          height={50}
          alt="Picture of the user"
        />
      </div>

      <form className={styles.writePost}>
        <input
          id="content"
          placeholder="Share your act . . . "
          type="text"
          autoComplete="off"
          value={values.content}
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          <button className={styles.addPhoto}>
            <a>
              <Image src="/upload.svg" width={20} height={20} alt="Upload" />
              <p>Add a photo </p>
            </a>
          </button>
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
