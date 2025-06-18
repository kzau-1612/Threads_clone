import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { Text } from "@mantine/core";
import { useSendVerificationEmail } from "../../../services/auth/mutation";
import { getLocalToken, removeToken } from "../../../utils/auth";
import { ROUTES } from "../../../utils/route";
import { useNavigate } from "@tanstack/react-router";

export default function SendVerification() {
  const { mutate, isPending } = useSendVerificationEmail();
  const navigate = useNavigate();

  useEffect(() => {
    modals.openConfirmModal({
      title: "Your account is not verified",
      centered: true,
      withCloseButton: false,
      children: <Text size="sm">We sent a link to your email, please check your email.</Text>,
      labels: { confirm: "Send verification email", cancel: "Back to login" },
      closeOnClickOutside: false,
      closeOnEscape: false,
      closeOnConfirm: false,
      trapFocus: true,
      confirmProps: {
        color: "black",
        loaderProps: { type: "custom", size: "sm" },
        loading: isPending,
      },
      onConfirm: () => {
        const url = window.location.origin + ROUTES.AUTH.CONFIRM_ACCOUNT;
        const accessToken = getLocalToken() ?? "";
        mutate({ url_target: url, access_token: accessToken });
      },
      onCancel: () => {
        removeToken();
        modals.closeAll();
        navigate({ to: "/login" });
      },
    });
  }, [isPending, navigate, mutate]);

  return null;
}
