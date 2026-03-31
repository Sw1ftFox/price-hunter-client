import type { Price } from "@/shared/types/Product";
import { CustomTooltip } from "@/shared/ui/CustomTooltip/CustomTooltip";
import { DateFormatter } from "@/shared/utils/DateFormatter";
import { LineChartOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProductChartProps {
  priceHistory: Price[];
}

export const ProductChart = ({ priceHistory }: ProductChartProps) => {
  const pricesWithFormattedDate = priceHistory.map((item) => ({
    ...item,
    date: DateFormatter.formatDate(item.date),
  }));

  return (
    <Card
      title={
        <Space>
          <LineChartOutlined /> График изменения цены
        </Space>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={pricesWithFormattedDate}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          style={{ outline: "none" }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `${value} ₽`}
            label={{ value: "Цена", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ffd700"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 1, stroke: "#ffd700", fill: "#fff" }}
            activeDot={{ r: 6, stroke: "#ffd700", fill: "#ffd700" }}
            name="Цена"
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
