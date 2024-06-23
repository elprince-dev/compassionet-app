import styles from "./page.module.scss";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <div className={styles.container}>
      <Feed />
    </div>
  );
}
