import { createFileRoute } from "@tanstack/react-router";
import Register from "../../../pages/Auth/Register/Register";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/register")({
  component: Register,
});
