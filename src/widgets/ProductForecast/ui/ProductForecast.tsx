import type { Price } from "@/shared/types/Product";
import { getPriceForecast } from "@/shared/utils/getPriceForecast";
import { CaretRightOutlined, RocketOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";

interface ProductForecastProps {
  priceHistory: Price[];
}

const { Paragraph, Text } = Typography;

export const ProductForecast = ({ priceHistory }: ProductForecastProps) => {
  const forecast = getPriceForecast(priceHistory || []);

  const forecastContent = forecast ? (
    <Text style={{ fontSize: "1rem" }}>
      {forecast.direction === "up" && "📈"}
      {forecast.direction === "down" && "📉"}
      {forecast.direction === "stable" && "➖"}
      <span>{forecast.description}</span>
    </Text>
  ) : (
    <Text style={{ fontSize: "1rem" }}>Данных недостаточно для прогноза </Text>
  );
  return (
    <Card
      title={
        <Space>
          <RocketOutlined /> Прогнозирование
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
        },
      }}
    >
      <Paragraph
        style={{
          margin: 0,
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <CaretRightOutlined style={{ marginTop: 6 }} />
        {forecastContent}
      </Paragraph>
      <Paragraph
        style={{
          margin: 0,
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <CaretRightOutlined style={{ marginTop: 6 }} />
        <Text style={{ fontSize: "1rem" }}>
          С учётом сезона (тег "🎄 Зимний"): в ноябре-декабре цены обычно
          растут. Рекомендуем обратить внимание.
        </Text>
      </Paragraph>
    </Card>
  );
};
