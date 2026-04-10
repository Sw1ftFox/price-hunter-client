import type { Product } from "@/shared/types/Product";
import { Button, Card, Checkbox, Col, Row } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { DateFormatter } from "@/shared/utils/DateFormatter";
import { useState } from "react";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import cls from "./ProductItem.module.scss";
import { CardCover } from "@/shared/ui/CardCover/CardCover";
import { useNavigate } from "react-router-dom";
import { getPriceChangeStyle } from "@/shared/utils/getPriceChangeStyle";
import { useCompareStore } from "@/features/useCompareStore/useCompareStore";

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

  const isCompareActive = useCompareStore((state) => state.isCompareActive);
  const fetchSelectedProducts = useCompareStore(
    (state) => state.fetchSelectedProducts,
  );
  const toggleProduct = useCompareStore((state) => state.toggleProduct);
  const selectedIds = useCompareStore((state) => state.selectedIds);

  const handleDelete = () => {
    deleteProduct(product.id);
    const filteredSelectedIds = Array.from(selectedIds).filter(
      (id) => id !== product.id,
    );
    fetchSelectedProducts(filteredSelectedIds);
  };

  const {
    priceChangeContent,
    priceColor,
    priceBackgroundColor,
    priceChangeIcon,
  } = getPriceChangeStyle(priceChange);

  return (
    <>
      <Card
        hoverable={!isCompareActive}
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px",
          },
          cover: {
            opacity: isCompareActive ? "10%" : "100%",
          },
          root: {
            backgroundColor: isCompareActive ? "#efefef8b" : "",
            position: "relative",
          },
        }}
        className={cls.product__card}
        cover={<CardCover imageUrl={image} name={name} />}
        onClick={() => {
          if (!isCompareActive) {
            navigate(`/products/${id}`);
          }
        }}
      >
        <Meta
          title={name}
          description={
            <div style={{ marginTop: "auto" }}>
              {isCompareActive ? (
                <Checkbox
                  style={{
                    position: "absolute",
                    top: 20,
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                  checked={selectedIds.has(id)}
                  onChange={() => {
                    toggleProduct(id);
                  }}
                >
                  Сравнить
                </Checkbox>
              ) : null}
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
                    disabled={isCompareActive}
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
                    disabled={isCompareActive}
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
                  disabled={isCompareActive}
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
