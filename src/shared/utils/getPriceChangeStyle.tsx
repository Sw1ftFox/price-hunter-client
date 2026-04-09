import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

export const getPriceChangeStyle = (
  priceChange: number,
): {
  priceChangeIcon: ReactNode;
  priceChangeContent: string;
  priceColor: string;
  priceBackgroundColor: string;
} => {
  const priceChangeContent =
    priceChange > 0 ? ` +${priceChange}` : ` ${priceChange || 0}`;

  const priceColor =
    priceChange > 0 ? "#ff4d4f" : priceChange < 0 ? "#52c41a" : "#939791";
  const priceBackgroundColor =
    priceChange > 0 ? "#fff1f0" : priceChange < 0 ? "#f6ffed" : "#e5e8e389";

  const priceChangeIcon =
    priceChange > 0 ? (
      <ArrowUpOutlined />
    ) : priceChange < 0 ? (
      <ArrowDownOutlined />
    ) : (
      <MinusOutlined />
    );

  return {
    priceChangeIcon,
    priceChangeContent,
    priceColor,
    priceBackgroundColor,
  };
};
