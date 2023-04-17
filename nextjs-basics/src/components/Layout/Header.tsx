import Link from "next/link";
import styles from "@/components/Layout/Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href="/">NextEvents</Link>
    </div>
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link href="/events">Browse All Events</Link>
        </li>
      </ul>
    </nav>
  </header>
);
