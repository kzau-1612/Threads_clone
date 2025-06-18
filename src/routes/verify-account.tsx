import { createFileRoute } from "@tanstack/react-router";
import SendVerification from "../pages/Auth/Verification/SendVerification";

export const Route = createFileRoute("/verify-account")({
  component: SendVerification,
});
