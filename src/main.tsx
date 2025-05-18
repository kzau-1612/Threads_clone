import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 5,
      retry: 1,
      // retryDelay: 1000,
      refetchOnWindowFocus: false,
      gcTime: 600000,
      refetchOnReconnect: false,
    },
  },
});

const theme = createTheme({
  /** Your theme override here */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </MantineProvider>
);
