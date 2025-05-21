import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";

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
  radius: { xs: "12px", sm: "12px", md: "12px", lg: "12px", xl: "12px" },
  // fontFamily: "system-ui,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,,sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
