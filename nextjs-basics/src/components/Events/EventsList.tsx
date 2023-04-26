import { EventItem } from "@/components/Events/EventItem";
import styles from "@/components/Events/EventList.module.css";
import { Event } from "../../helpers/types";

export const EventsList = ({ items }: { items: Event[] }) => (
  <ul className={styles.list}>
    {items.map((event) => (
      <EventItem {...event} key={event.id} />
    ))}
  </ul>
);
