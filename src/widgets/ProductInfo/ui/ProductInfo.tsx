import type { ProductDetailInfo } from "@/shared/types/Product";
import { formatTimeAgo } from "@/shared/utils/FormatTimeAgo";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Space } from "antd";
import { Typography } from "antd";
import { useEffect } from "react";
import cls from "./ProductInfo.module.scss";

interface ProductInfoProps {
  productId: string;
  fetchProduct: (productId: string) => void;
  product: ProductDetailInfo | null;
}

const { Title, Paragraph, Text } = Typography;
export const ProductInfo = ({
  productId,
  fetchProduct,
  product,
}: ProductInfoProps) => {
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [fetchProduct]);

  const prices = product?.priceHistory.map((item) => item.price) ?? [];

  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <Flex gap="middle" className={cls.product__info}>
      <div style={{ width: 220 }}>
        <Image
          width="100%"
          height="100%"
          src={product?.image}
          alt={product?.name}
          style={{ objectFit: "cover", borderRadius: 8 }}
          preview={false}
        />
      </div>
      <Flex vertical style={{ flex: 1 }}>
        <Title level={3}>{product?.name}</Title>
        <Card
          title={
            <Space>
              <InfoCircleOutlined /> Информация о товаре
            </Space>
          }
          style={{ marginTop: 16, width: "100%" }}
        >
          <Button
            type="link"
            href={product?.url}
            target="_blank"
            style={{
              padding: 0,
              fontSize: "1rem",
              fontWeight: 400,
              color: "#e7c621",
              textDecoration: "underline",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgb(252, 236, 147)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "#e7c621")}
          >
            Ссылка на товар
          </Button>
          <Paragraph style={{ margin: 0, fontSize: "1.1rem" }}>
            Последнее обновление:{" "}
            <Text type="success" style={{ fontSize: "1rem", fontWeight: 600 }}>
              {formatTimeAgo(product?.lastChecked || "")}
            </Text>
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: "1.1rem" }}>
            Максимальная цена:{" "}
            <Text type="danger" style={{ fontSize: "1rem", fontWeight: 600 }}>
              {" "}
              {maxPrice}
            </Text>
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: "1.1rem" }}>
            Минимальная цена:{" "}
            <Text type="success" style={{ fontSize: "1rem", fontWeight: 600 }}>
              {" "}
              {minPrice}
            </Text>
          </Paragraph>
        </Card>
      </Flex>
    </Flex>
  );
};
