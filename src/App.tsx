import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
  defaultNotFoundComponent: () => <h1>Not found</h1>,
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
