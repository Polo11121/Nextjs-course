import MeetupItem from "./MeetupItem";
import { Meetup } from "../../helpers/types";
import classes from "./MeetupList.module.css";

const MeetupList = ({ meetups }: { meetups: Meetup[] }) => (
  <ul className={classes.list}>
    {meetups.map(({ id, title, image, address }) => (
      <MeetupItem
        key={id}
        id={id}
        image={image}
        title={title}
        address={address}
      />
    ))}
  </ul>
);

export default MeetupList;
