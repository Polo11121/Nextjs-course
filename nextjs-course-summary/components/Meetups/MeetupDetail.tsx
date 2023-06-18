import { Meetup } from "../../helpers/types";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({ image, title, address, description }: Meetup) => (
  <section className={classes.detail}>
    <img src={image} alt={title} />
    <h1>{title}</h1>
    <address>{address}</address>
    <p>{description}</p>
  </section>
);

export default MeetupDetail;
