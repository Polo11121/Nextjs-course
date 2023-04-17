import { EventItem } from "@/components/Events/EventItem";
import styles from "@/components/Events/EventList.module.css";

export type Event = {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
};

export const EventsList = ({ items }: { items: Event[] }) => (
  <ul className={styles.list}>
    {items.map((event) => (
      <EventItem {...event} key={event.id} />
    ))}
  </ul>
);
