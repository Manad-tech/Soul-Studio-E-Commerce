import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import HomePage from "@/pages/Home/HomePage";
import PortfolioPage from "@/pages/Portfolio";
import PortfolioDetailsPage from "@/pages/Portfolio/PortfolioDetailsPage";
import ShopPage from "@/pages/Shop/ShopPage";
import ProductDetailsPage from "@/pages/Product/ProductDetailsPage";
import CartPage from "@/pages/Cart/CartPage";
import CheckoutPage from "@/pages/Checkout/CheckoutPage";
import WishlistPage from "@/pages/Wishlist/WishlistPage";

import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import DashboardPage from "@/pages/Admin/DashboardPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import ContactPage from "@/pages/Contact/ContactPage";
import AboutPage from "@/pages/About/AboutPage";
import AdminProductsPage from "@/pages/Admin/ProductsPage";
import AdminOrdersPage from "@/pages/Admin/OrdersPage";
import AdminGuard from "@/components/guards/AdminGuard";

import CommissionPage from "@/pages/Commission/CommissionPage";
import ShippingPage from "@/pages/Support/ShippingPage";
import ReturnsPage from "@/pages/Support/ReturnsPage";
import PrivacyPage from "@/pages/Support/PrivacyPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

import GiftCardPage from "@/pages/GiftCard/GiftCardPage";
import SnailMailClubPage from "@/pages/SnailMail/SnailMailClubPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "portfolio/:slug", element: <PortfolioDetailsPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:slug", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "commission", element: <CommissionPage /> },
      { path: "shipping", element: <ShippingPage /> },
      { path: "returns", element: <ReturnsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "gift-card", element: <GiftCardPage /> },
      { path: "snail-mail-club", element: <SnailMailClubPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
