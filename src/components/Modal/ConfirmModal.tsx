// components/ConfirmModal.tsx
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { ReactNode } from "react";

interface ConfirmModalProps {
  title?: string;
  message: ReactNode;
  labels?: { confirm: string; cancel: string };
  onConfirm: () => void;
  onCancel?: () => void;
  confirmColor?: "red" | "blue" | "green" | "gray" | "black";
}

export const useConfirmModal = () => {
  const modals = useModals();

  const openConfirmModal = ({
    title = "Confirm",
    message,
    labels = { confirm: "Confirm", cancel: "Cancel" },
    onConfirm,
    onCancel,
    confirmColor = "black",
  }: ConfirmModalProps) => {
    modals.openConfirmModal({
      title,
      children: <Text size="sm">{message}</Text>,
      labels,
      centered: true,
      confirmProps: { color: confirmColor },
      onCancel: () => onCancel?.(),
      onConfirm,
    });
  };

  return openConfirmModal;
};
