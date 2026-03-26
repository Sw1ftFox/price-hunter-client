import { useEffect, useMemo } from "react";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { ProductItem } from "@/widgets/ProductItem";
import { Row, Col, Alert } from "antd";
import { ErrorAlert } from "@/shared/ui/ErrorAlert/ErrorAlert";
import { SkeletonCards } from "@/shared/ui/SkeletonCards/SkeletonCards";
import type { ProductSortType } from "@/shared/types/ProductSort";

interface ProductListProps {
  term: string;
  sortType: ProductSortType | null;
}

export const ProductList = ({ term, sortType }: ProductListProps) => {
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const isError = useProductsStore((state) => state.isError);
  const errorMessage = useProductsStore((state) => state.errorMessage);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (term) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase()),
      );
    }
    if (sortType === "priceInc") {
      result.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortType === "priceDesc") {
      result.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (sortType === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "profit") {
      result.sort((a, b) => a.priceChange - b.priceChange);
    }
    return result;
  }, [products, term, sortType]);
  const isEmpty = filteredProducts.length === 0;

  const error =
    isError && !isLoading ? (
      <ErrorAlert errorMessage={errorMessage} onClick={fetchProducts} />
    ) : null;
  const loading = isLoading ? <SkeletonCards /> : null;

  const warning =
    isEmpty && !isLoading ? (
      <Alert
        title="Нет товаров"
        description="Добавьте товары для отслеживания"
        type="info"
        showIcon
        style={{ backgroundColor: "#ffd90029", borderColor: "#FFD700" }}
        styles={{ icon: { color: "#FFD700" } }}
      />
    ) : null;

  const content =
    !isLoading && !isError && !isEmpty ? (
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={8} md={6} xl={4}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    ) : null;

  return (
    <>
      {error}
      {loading}
      {warning}
      {content}
    </>
  );
};
