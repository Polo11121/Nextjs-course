import { ReactNode } from "react";
import styles from "./EventContent.module.css";

export const EventContent = ({ children }: { children: ReactNode }) => (
  <section className={styles.content}>{children}</section>
);
