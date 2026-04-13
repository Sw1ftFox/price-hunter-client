import type { Product } from "@/shared/types/Product";
import { App, Button, Card, Col, Row } from "antd";
import cls from "./RelatedProductItem.module.scss";
import { CardCover } from "@/shared/ui/CardCover/CardCover";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import type { MouseEvent } from "react";

interface RelatedProductItemProps {
  product: Product;
}

const { Meta } = Card;

export const RelatedProductItem = ({ product }: RelatedProductItemProps) => {
  const { name, image, currentPrice, url } = product;
  const addProduct = useProductsStore((state) => state.addProduct);
  const isError = useProductsStore((state) => state.isError);
  const errorMessage = useProductsStore((state) => state.errorMessage);
  const { message } = App.useApp();

  const handleAddProduct = (e: MouseEvent) => {
    e.stopPropagation();
    addProduct(url);
    if (!isError) {
      message.success("Товар успешно добавлен!");
    } else {
      message.error(errorMessage);
    }
  };

  return (
    <Card
      styles={{
        body: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px",
        },
        root: {
          position: "relative",
        },
      }}
      className={cls.product__card}
      cover={<CardCover imageUrl={image} name={name} />}
    >
      <Meta
        title={name}
        description={
          <div style={{ marginTop: "auto" }}>
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {currentPrice} ₽
                </div>
              </Col>
            </Row>
            <Col style={{ padding: 0 }}>
              <Row
                gutter={[0, 10]}
                justify="space-between"
                align="middle"
                style={{ marginTop: 10 }}
              ></Row>
            </Col>
            <Col style={{ padding: 0 }}>
              <Button
                type="default"
                icon={<PlusCircleOutlined />}
                variant="outlined"
                color="green"
                style={{
                  fontWeight: "500",
                  margin: "0 auto",
                  display: "flex",
                }}
                onClick={handleAddProduct}
              >
                Отслеживать
              </Button>
              <Button
                type="link"
                href={url}
                target="_blank"
                style={{
                  padding: 0,
                  color: "#1f34be",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
                className={cls.product__link}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Ссылка на товар
              </Button>
            </Col>
          </div>
        }
      />
    </Card>
  );
};
