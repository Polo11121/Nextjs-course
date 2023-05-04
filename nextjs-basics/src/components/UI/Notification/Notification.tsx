import { useNotificationContext } from "@/context/NotificationContext";
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
  const { toggleNotificationHandler } = useNotificationContext();

  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={cssClasses} onClick={() => toggleNotificationHandler(null)}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
