import classNames from "classnames";
import cls from "./AuthPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthPageProps {
  className?: string;
}

export const AuthPage = ({ className }: AuthPageProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/products";
    return (
        <div className={classNames(cls.AuthPage, className)}>
            <button onClick={() => navigate(fromPage, { replace: true })}>Войти в аккаунт</button>
        </div>
    );
};
