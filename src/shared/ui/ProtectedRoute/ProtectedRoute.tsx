import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import type { FC, JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StorageService } from "@/shared/utils/StorageService";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const location = useLocation();

  const checkAuth = () => {
    const user = StorageService.getItem("user");

    return user && isAuth;
  };

  if (!checkAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
