import { ReactNode } from "react";
import styles from "./ErrorAlert.module.css";

export const ErrorAlert = ({ children }: { children: ReactNode }) => (
  <div className={styles.alert}>{children}</div>
);
