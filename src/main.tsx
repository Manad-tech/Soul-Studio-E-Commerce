import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@fontsource/playfair-display";
import "@fontsource/dm-sans";

import "./index.css";

import { router } from "@/routes";
import AppProviders from "./providers/AppProviders";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" closeButton />
    </AppProviders>
  </React.StrictMode>,
);
