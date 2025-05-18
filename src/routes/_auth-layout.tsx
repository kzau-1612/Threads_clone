import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if (isLogged()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <h1>Hello "/_auth-layout"!</h1>
      <Outlet />
    </>
  );
}
