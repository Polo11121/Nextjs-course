import { AddressIcon } from "@/components/Icons/AddressIcon";
import { DateIcon } from "@/components/Icons/DateIcon";
import { LogisticsItem } from "./LogisticsItem";
import styles from "./EventLogistics.module.css";

type EventLogisticsProps = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

export const EventLogistics = ({
  date,
  address,
  image,
  imageAlt,
}: EventLogisticsProps) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem Icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem Icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};
