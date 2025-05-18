import { createRouteMask, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./components/NotFound/NotFound";
import Pending from "./components/Pending/Pending";
import Error from "./components/Error/Error";

const stepsMask = createRouteMask({
  routeTree,
  from: "/steps",
  to: "/steps",
  search: (prev) => ({ ...prev, step: NaN }),
});

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Pending,
  defaultErrorComponent: Error,
  defaultPendingMs: 100,
  routeMasks: [stepsMask],
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}
