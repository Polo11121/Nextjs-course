import { ReactNode } from "react";
import Link from "next/link";
import styles from "@/components/UI/Button/Button.module.css";

type ButtonProps = {
  children: ReactNode;
  link?: string;
  onClick?: () => void;
};

export const Button = ({ children, link, onClick }: ButtonProps) =>
  link ? (
    <Link href={link} legacyBehavior>
      <a className={styles.btn}>{children}</a>
    </Link>
  ) : (
    <button onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
