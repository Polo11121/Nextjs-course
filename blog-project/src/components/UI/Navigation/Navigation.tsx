import { Logo } from "@/components/UI/Logo/Logo";
import Link from "next/link";
import styles from "@/components/UI/Navigation/Navigation.module.css";

export const Navigation = () => (
  <header className={styles.header}>
    <Link href="/" legacyBehavior>
      <a>
        <Logo />
      </a>
    </Link>
    <nav>
      <ul>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
);
