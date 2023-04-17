import { Button } from "@/components/UI/Button/Button";
import styles from "@/components/Events/ResultsTitle.module.css";

export const ResultsTitle = ({ date }: { date: Date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};
