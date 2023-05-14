import ReactDOM from "react-dom";
import styles from "./Notification.module.css";

export const Notification = ({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: string;
}) => {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notification") as HTMLElement
  );
};
