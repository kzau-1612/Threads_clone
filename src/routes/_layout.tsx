import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello! I'm a layout but I'm not shown in the URL 🙈</p>
      <Link to="/foo">Short Foo</Link> <Link to="/bar">Short Bar</Link>
      <hr />
      <Outlet />
    </div>
  );
}
