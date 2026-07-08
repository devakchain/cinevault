import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#18181b",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
