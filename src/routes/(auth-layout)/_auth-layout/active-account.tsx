import { createFileRoute } from "@tanstack/react-router";
import ActiveAccount from "../../../pages/Auth/ActiveAccount/ActiveAccount";
import { ConfirmToken, confirmTokenSchema } from "../../../schemas/Auth/authSchema";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/active-account")({
  validateSearch: (search: Record<string, unknown>): ConfirmToken => {
    return confirmTokenSchema.parse(search);
  },
  component: ActiveAccount,
});
