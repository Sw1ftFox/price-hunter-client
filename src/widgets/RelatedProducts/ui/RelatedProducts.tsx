// eslint-disable-next-line max-len
import { useRelatedProductsStore } from "@/features/useRelatedProductsStore/useRelatedProductsStore";
import { ErrorAlert } from "@/shared/ui/ErrorAlert/ErrorAlert";
import { ProductGrid } from "@/shared/ui/ProductGrid/ProductGrid";
import {
  CloseCircleOutlined,
  LikeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import { useState } from "react";
import cls from "./RelatedProducts.module.scss";

interface RelatedProductsProps {
  onClick: () => void;
  handleLoadMore: (offset: number) => void;
}

const { Paragraph, Text } = Typography;

export const RelatedProducts = ({
  onClick,
  handleLoadMore,
}: RelatedProductsProps) => {
  const relatedProducts = useRelatedProductsStore(
    (state) => state.relatedProducts,
  );
  const isLoading = useRelatedProductsStore((state) => state.isLoading);
  const isError = useRelatedProductsStore((state) => state.isError);
  const errorMessage = useRelatedProductsStore((state) => state.errorMessage);
  const [offset, setOffset] = useState(6);

  const content = relatedProducts ? (
    <>
      <ProductGrid
        products={relatedProducts.items}
        itemType="relatedProduct"
        className={cls.related__products__list}
      />
      <Button
        type="default"
        icon={<PlusCircleOutlined />}
        variant="outlined"
        color="green"
        style={{
          fontWeight: "500",
          display:
            relatedProducts.items.length >= relatedProducts.total ? "none" : "",
        }}
        disabled={isLoading}
        onClick={() => {
          handleLoadMore(offset);
          setOffset((prev) => prev + 6);
        }}
      >
        Загрузить еще
      </Button>
    </>
  ) : !isError ? (
    <Paragraph
      style={{
        margin: 0,
        display: "flex",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      <Text
        type="warning"
        style={{ fontSize: "1rem", margin: "0 auto", marginBottom: 10 }}
      >
        <CloseCircleOutlined style={{ marginTop: 6 }} /> Рекомендуемые товары не
        найдены...
      </Text>
    </Paragraph>
  ) : null;

  const error = isError ? (
    <ErrorAlert errorMessage={errorMessage} onClick={onClick} />
  ) : null;

  return (
    <Card
      title={
        <Space>
          <LikeOutlined /> Рекомендуемые товары
        </Space>
      }
      style={{
        width: "100%",
      }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 10,
          marginTop: 10,
        },
      }}
    >
      {content}
      {error}
    </Card>
  );
};
