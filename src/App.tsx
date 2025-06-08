import { createRouteMask, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./components/NotFound/NotFound";
import Pending from "./components/Pending/Pending";
import Error from "./components/Error/Error";
import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const stepsMask = createRouteMask({
  routeTree,
  from: "/steps",
  to: "/steps",
  search: (prev) => ({ ...prev, step: NaN }),
});

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
    queryClient,
  },
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Pending,
  defaultErrorComponent: Error,
  defaultPendingMs: 1000,
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
