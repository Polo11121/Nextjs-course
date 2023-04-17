import { ReactNode } from "react";
import styles from "./LogisticsItem.module.css";

export const LogisticsItem = ({
  children,
  Icon,
}: {
  children: ReactNode;
  Icon: () => JSX.Element;
}) => (
  <li className={styles.item}>
    <span className={styles.icon}>
      <Icon />
    </span>
    <span className={styles.content}>{children}</span>
  </li>
);
