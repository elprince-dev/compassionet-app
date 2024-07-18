"use client";
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch user information from an API or local storage
    const fetchUserProfile = async (url) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        throw new Error("Failed to fetch user profile");
      }
    };

    fetchUserProfile(baseURL + "/user/me");
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
