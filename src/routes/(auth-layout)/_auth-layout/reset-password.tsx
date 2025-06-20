import { createFileRoute, redirect } from "@tanstack/react-router";
import ResetPassword from "../../../pages/Auth/ResetPassword/ResetPassword";
import { ConfirmToken, confirmTokenSchema } from "../../../schemas/Auth/authSchema";
import { ROUTES } from "../../../utils/route";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/reset-password")({
  validateSearch: (search: Record<string, unknown>): ConfirmToken => {
    return confirmTokenSchema.parse(search);
  },
  loaderDeps: ({ search: { token } }) => ({
    token,
  }),
  loader: async ({ deps: { token } }) => {
    if (!token || token === "undefined") throw redirect({ to: ROUTES.AUTH.LOGIN });
  },
  component: ResetPassword,
});
