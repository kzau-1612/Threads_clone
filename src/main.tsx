import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@mantine/core/styles.css";
import styles from "./index.module.css";
import "@mantine/notifications/styles.css";
import App from "./App.tsx";
import { Input, Loader, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { CustomLoader } from "./components/Common/CustomLoader.tsx";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 5,
      retry: 1,
      // retryDelay: 1000,
      refetchOnWindowFocus: false,
      gcTime: 600000,
      staleTime: 600000,
      refetchOnReconnect: false,
    },
  },
});

const theme = createTheme({
  /** Your theme override here */
  radius: { xs: "12px", sm: "12px", md: "12px", lg: "12px", xl: "12px" },
  components: {
    Input: Input.extend({ classNames: styles }),
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CustomLoader },
        type: "custom",
      },
    }),
  },

  fontFamily: "Helvetica, Arial, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
            <Notifications autoClose={3000} position="top-center" limit={3} w="fit-content" />
            <App />
          </ModalsProvider>
        </Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
