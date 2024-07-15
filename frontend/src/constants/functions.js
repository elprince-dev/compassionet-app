export const fetchUserProfile = async (url) => {
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
    const data = response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch user profile");
  }
};

export const fetchPosts = async (url) => {
  const token = localStorage.getItem("token");
  try {
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch posts");
  }
};

export const updateLikes = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to like/unlike the post");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error:", error);
    throw error;
  }
};

export const addComment = async (url, comment, post_id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment, post_id: post_id }),
    });
    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchComments = async (url, post_id) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
