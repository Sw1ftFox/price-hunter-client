import classNames from "classnames";
import cls from "./AuthPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";

interface AuthPageProps {
  className?: string;
}

export const AuthPage = ({ className }: AuthPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/products";

  const isLoading = useAuthStore((state) => state.isLoading);
  const isError = useAuthStore((state) => state.isError);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const authUser = useAuthStore((state) => state.authUser);

  const onAuth = (email: string, password: string) => {
    authUser(email, password, "login", () => {
      navigate(fromPage, { replace: true });
    });
  };

  const error = !isLoading && isError ? <div>{errorMessage}</div> : null;
  const loading = isLoading ? <PageLoader /> : null;
  const content =
    !isLoading && !isError ? (
      <button onClick={() => onAuth("someemail", "somepassword")}>
        Войти в аккаунт
      </button>
    ) : null;

  return (
    <div className={classNames(cls.AuthPage, className)}>
      {content}
      {loading}
      {error}
    </div>
  );
};
