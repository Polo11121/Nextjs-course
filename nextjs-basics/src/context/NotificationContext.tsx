import { createContext, useContext, useEffect, useState } from "react";

type Notification = {
  title: string;
  message: string;
  status: string;
};

const NotificationContext = createContext<{
  notification: Notification | null;
  toggleNotificationHandler: (notificationData: Notification | null) => void;
}>({
  notification: null,
  toggleNotificationHandler: (notificationData: Notification | null) => {},
});

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const toggleNotificationHandler = (notificationData: Notification | null) =>
    setNotification(notificationData);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        toggleNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContextProvider;
