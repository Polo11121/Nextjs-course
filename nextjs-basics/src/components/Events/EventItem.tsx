import { Event } from "@/components/Events/EventsList";
import { Button } from "@/components/UI/Button/Button";
import { DateIcon } from "@/components/Icons/DateIcon";
import { AddressIcon } from "@/components/Icons/AddressIcon";
import { ArrowRightIcon } from "@/components/Icons/ArrowRightIcon";
import styles from "@/components/events/EventItem.module.css";

type EventItemProps = Event;

export const EventItem = ({
  id,
  title,
  image,
  date,
  location,
}: EventItemProps) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt={`${title}-image`} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
        </div>
        <div className={styles.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div className={styles.actions}>
        <Button link={`/events/${id}`}>
          <span>Explore</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRightIcon
              style={{
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          </span>
        </Button>
      </div>
    </li>
  );
};
