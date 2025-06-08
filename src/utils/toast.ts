import { NotificationData, notifications } from "@mantine/notifications";
import notification from "/src/assets/css/Notification.module.css";

export const infoToast = (options: NotificationData) => {
  notifications.show({ classNames: notification, withCloseButton: false, ...options });
};
