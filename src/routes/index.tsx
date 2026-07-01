import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/Home";
import PortfolioPage from "@/pages/Portfolio";
import ShopPage from "@/pages/Shop";
import ProductPage from "@/pages/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
    ],
  },
]);