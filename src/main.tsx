import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryBasics } from "./examples";

import "@/styles/globals.css";

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <QueryBasics />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
