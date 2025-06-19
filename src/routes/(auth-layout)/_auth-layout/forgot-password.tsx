import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../../../pages/Auth/ForgotPassword/ForgotPassword";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/forgot-password")({
  component: ForgotPassword,
});
