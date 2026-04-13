import classNames from "classnames";
import cls from "./ProductGrid.module.scss";
import { ProductItem } from "@/widgets/ProductItem";
import type { Product } from "@/shared/types/Product";
import { RelatedProductItem } from "@/widgets/RelatedProductItem";

interface ProductGridProps {
  products: Product[];
  itemType: "product" | "relatedProduct";
  className?: string;
}

export const ProductGrid = ({
  products,
  itemType,
  className,
}: ProductGridProps) => {
  return (
    <div className={classNames(cls.products__list, className)}>
      {products.map((product) =>
        itemType === "product" ? (
          <ProductItem key={product.id + itemType} product={product} />
        ) : (
          <RelatedProductItem key={product.id + itemType} product={product} />
        ),
      )}
    </div>
  );
};
