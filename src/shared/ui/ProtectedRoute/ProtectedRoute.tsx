import type { FC, JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = false;
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children;
};

export default ProtectedRoute;
