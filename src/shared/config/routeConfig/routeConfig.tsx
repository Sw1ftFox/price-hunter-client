import ErrorBoundary from "@/app/providers/ErrorBoundary/ui/ErrorBoundary";
import { AuthPage } from "@/pages/AuthPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductDetailPageAsync } from "@/pages/ProductDetailPage";
import { ProductsPageAsync } from "@/pages/ProductsPage";
import ProtectedRoute from "@/shared/ui/ProtectedRoute/ProtectedRoute";
import type { RouteProps } from "react-router-dom";

export const AppRoutes = {
  LOGIN: "login",
  REGISTER: "register",
  PRODUCTS: "products",
  PRODUCTS_ID: "products_id",
  NOT_FOUND: "not_found",
} as const;

export type AppRoutesValues = (typeof AppRoutes)[keyof typeof AppRoutes];

export const RoutePath: Record<AppRoutesValues, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTER]: "/",
  [AppRoutes.PRODUCTS]: "/products",
  [AppRoutes.PRODUCTS_ID]: "/products/:id",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutesValues, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: (
      <ErrorBoundary>
        <AuthPage />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: (
      <ErrorBoundary>
        <AuthPage />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.PRODUCTS]: {
    path: RoutePath.products,
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <ProductsPageAsync />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  [AppRoutes.PRODUCTS_ID]: {
    path: RoutePath.products_id,
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <ProductDetailPageAsync />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <ProtectedRoute>
        <NotFoundPage />
      </ProtectedRoute>
    ),
  },
};
