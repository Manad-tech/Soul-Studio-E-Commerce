import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@fontsource/playfair-display";
import "@fontsource/dm-sans";

import "./index.css";

import { router } from "@/routes";
import { QueryProvider } from "@/providers/query-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>
);