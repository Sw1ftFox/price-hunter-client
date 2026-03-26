import type { PreviewProduct as PreviewProductType } from "@/shared/types/Product";
import { FileImageOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

interface PreviewProductProps {
  preview: PreviewProductType | null;
}

const { Meta } = Card;

export const PreviewProduct = ({ preview }: PreviewProductProps) => {
  return (
    <Col
      style={{ borderTop: "1px solid #cbc6c6", paddingTop: 6, marginTop: 10 }}
    >
      <Row style={{ fontWeight: 600, marginBottom: 8 }} justify="center">
        Предпросмотр
      </Row>
      <Row>
        <Card
          style={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
          }}
          cover={
            preview?.image ? (
              <img
                style={{
                  objectFit: "cover",
                  height: 150,
                  width: "100%",
                  borderRadius: "8px 0px 0px 8px",
                }}
                draggable={false}
                alt="Изображение товара"
                src={preview?.image}
              />
            ) : (
              <div
                style={{
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  padding: 15,
                }}
              >
                <FileImageOutlined style={{ fontSize: "4rem", opacity: 0.5 }} />
              </div>
            )
          }
        >
          <Meta
            title={
              preview?.title
                ? preview?.title.slice(0, 10) + "..."
                : "Название товара"
            }
            description={
              preview?.currentPrice
                ? `${preview?.currentPrice} руб.`
                : "Цена руб."
            }
          />
        </Card>
      </Row>
    </Col>
  );
};
