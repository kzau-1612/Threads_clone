import { createFileRoute } from "@tanstack/react-router";
import Login from "../../../pages/Auth/Login/Login";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/login")({
  component: Login,
});
