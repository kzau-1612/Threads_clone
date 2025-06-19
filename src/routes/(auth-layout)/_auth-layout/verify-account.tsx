import { createFileRoute } from "@tanstack/react-router";
import SendVerification from "../../../pages/Auth/Verification/SendVerification";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/verify-account")({
  component: SendVerification,
});
