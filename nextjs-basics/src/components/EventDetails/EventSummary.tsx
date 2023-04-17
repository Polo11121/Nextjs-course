import styles from "./EventSummary.module.css";

export const EventSummary = ({ title }: { title: string }) => (
  <section className={styles.summary}>
    <h1>{title}</h1>
  </section>
);
