import type { Product } from "@/shared/types/Product";
import { Button, Card, Col, Row } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EyeOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { DateFormatter } from "@/shared/utils/DateFormatter";
import { useState } from "react";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import cls from "./ProductItem.module.scss";
import { CardCover } from "@/shared/ui/CardCover/CardCover";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: Product;
}

const { Meta } = Card;

export const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const { id, name, image, currentPrice, priceChange, lastChecked, url } =
    product;
  const formattedDate = DateFormatter.formatDate(lastChecked);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  const priceChangeIcon =
    priceChange > 0 ? (
      <ArrowUpOutlined />
    ) : priceChange < 0 ? (
      <ArrowDownOutlined />
    ) : (
      <MinusOutlined />
    );

  const priceChangeContent =
    priceChange > 0 ? ` +${priceChange}` : ` ${priceChange || 0}`;

  const priceColor =
    priceChange > 0 ? "#ff4d4f" : priceChange < 0 ? "#52c41a" : "#939791";
  const priceBackgroundColor =
    priceChange > 0 ? "#fff1f0" : priceChange < 0 ? "#f6ffed" : "#e5e8e389";

  return (
    <>
      <Card
        hoverable
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px",
          },
        }}
        className={cls.product__card}
        cover={<CardCover imageUrl={image} name={name} />}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
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
                      color: priceColor,
                      background: priceBackgroundColor,
                      padding: "2px 8px",
                      borderRadius: "12px",
                      display: "inline-block",
                      fontSize: "12px",
                    }}
                  >
                    {priceChangeIcon}
                    {priceChangeContent} ₽
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
                    icon={<EyeOutlined />}
                    variant="outlined"
                    color="primary"
                    style={{
                      color: "#ffd700",
                      fontWeight: "500",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Подробнее
                  </Button>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeleteModalOpen(true);
                    }}
                    type="default"
                    icon={<DeleteOutlined />}
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
                  href={url}
                  target="_blank"
                  style={{
                    padding: 0,
                    color: "#1f34be",
                    fontWeight: "500",
                  }}
                  className={cls.product__link}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
      </Card>
      <DeleteProductModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};
