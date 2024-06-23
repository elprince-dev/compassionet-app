import React from "react";
import styles from "../styles/suggestions.module.scss";

const Suggestions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.communities}>
        <h3>Suggested Communities</h3>
      </div>
      <div className={styles.users}>
        <h3>Suggested Users</h3>
      </div>
    </div>
  );
};

export default Suggestions;
