import type { Product } from "@/shared/types/Product";
import { Button, Card, Col, Row } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { DateFormatter } from "@/shared/utils/DateFormatter";
import { useState } from "react";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { ImageStub } from "@/shared/ui/ImageStub/ImageStub";
import cls from "./ProductItem.module.scss";

interface ProductItemProps {
  product: Product;
}

const { Meta } = Card;

export const ProductItem = ({ product }: ProductItemProps) => {
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const { id, name, image, currentPrice, priceChange, lastChecked, url } =
    product;
  const formattedDate = DateFormatter.formatDate(lastChecked);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px",
        },
      }}
      cover={
        image ? (
          <img
            draggable={false}
            alt={`Изображение ${name}`}
            src={image}
            style={{
              objectFit: "cover",
              height: 150,
              width: "100%",
            }}
          />
        ) : (
          <ImageStub
            style={{
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
            imageSize="4rem"
          />
        )
      }
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
              <Col>
                <div
                  style={{
                    color: priceChange >= 0 ? "red" : "green",
                    fontWeight: "500",
                  }}
                >
                  {priceChange >= 0 ? (
                    <div>
                      <ArrowUpOutlined /> +{priceChange} ₽
                    </div>
                  ) : (
                    <div>
                      <ArrowDownOutlined /> {priceChange} ₽
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Col style={{ padding: 0 }}>
              <Row
                gutter={[0, 10]}
                justify="space-between"
                align="middle"
                style={{ marginTop: 10 }}
              >
                <Button
                  type="link"
                  href={`/products/${id}`}
                  variant="outlined"
                  color="primary"
                  style={{
                    color: "#ffd700",
                    fontWeight: "500",
                  }}
                >
                  Подробнее
                </Button>

                <Button
                  onClick={() => setIsDeleteModalOpen(true)}
                  type="default"
                  variant="outlined"
                  color="danger"
                  style={{
                    color: "red",
                    fontWeight: "500",
                  }}
                >
                  Удалить
                </Button>
              </Row>
            </Col>
            <Col style={{ padding: 0 }}>
              <Button
                type="link"
                target="_blank"
                href={url}
                style={{
                  padding: 0,
                  color: "#1f34be",
                  fontWeight: "500",
                }}
                className={cls.product__link}
              >
                Ссылка на товар
              </Button>
            </Col>

            <div style={{ fontSize: "12px", color: "#888", marginTop: 8 }}>
              Обновлялось:{" "}
              <span style={{ color: "green", fontWeight: 600 }}>
                {formattedDate}
              </span>
            </div>
          </div>
        }
      />
      <DeleteProductModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </Card>
  );
};
