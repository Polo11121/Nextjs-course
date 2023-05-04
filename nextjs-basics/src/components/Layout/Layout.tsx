import { ReactNode } from "react";
import { Header } from "@/components/Layout/Header";
import { Notification } from "@/components/UI/Notification/Notification";
import { useNotificationContext } from "@/context/NotificationContext";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { notification } = useNotificationContext();

  return (
    <>
      <Header />
      <main>{children}</main>
      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
          title={notification.title}
        />
      )}
    </>
  );
};
