import { ReactNode } from "react";
import classes from "./Card.module.css";

const Card = ({ children }: { children: ReactNode }) => (
  <div className={classes.card}>{children}</div>
);

export default Card;
