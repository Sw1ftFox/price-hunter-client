import classNames from "classnames";
import cls from "./ProductsPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { useEffect } from "react";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";

interface ProductsPageProps {
  className?: string;
}

const ProductsPage = ({ className }: ProductsPageProps) => {
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const isError = useProductsStore((state) => state.isError);
  const errorMessage = useProductsStore((state) => state.errorMessage);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const onExit = () => {
    logout(() => {
      navigate("/login");
    });
  };

  const loading = isLoading ? <PageLoader /> : null;
  const content =
    !isLoading && !isError
      ? products.map((product) => <div key={product.id}>{product.name}</div>)
      : null;
  const error = isError && !isLoading ? <div>{errorMessage}</div> : null;

  return (
    <div className={classNames(cls.ProductsPage, className)}>
      <Link to={"/login"} onClick={onExit}>
        Вернуться назад
      </Link>

      {loading}
      {content}
      {error}
    </div>
  );
};

export default ProductsPage;
