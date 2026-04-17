import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { getPriceChangeStyle } from "./getPriceChangeStyle";

describe("getPriceChangeStyle", () => {
  test("Валидное положительное значение", () => {
    expect(getPriceChangeStyle(120)).toEqual({
      priceChangeIcon: <ArrowUpOutlined />,
      priceChangeContent: " +120",
      priceColor: "#ff4d4f",
      priceBackgroundColor: "#fff1f0",
    });
  });
  test("Валидное отрицательное значение", () => {
    expect(getPriceChangeStyle(-120)).toEqual({
      priceChangeIcon: <ArrowDownOutlined />,
      priceChangeContent: " -120",
      priceColor: "#52c41a",
      priceBackgroundColor: "#f6ffed",
    });
  });
  test("Валидное нулевое значение", () => {
    expect(getPriceChangeStyle(0)).toEqual({
      priceChangeIcon: <MinusOutlined />,
      priceChangeContent: " 0",
      priceColor: "#939791",
      priceBackgroundColor: "#e5e8e389",
    });
  });
  test("Пограничное значение 1", () => {
    expect(getPriceChangeStyle(-500_000)).toEqual({
      priceChangeIcon: <ArrowDownOutlined />,
      priceChangeContent: " -500000",
      priceColor: "#52c41a",
      priceBackgroundColor: "#f6ffed",
    });
  });
  test("Пограничное значение 2", () => {
    expect(getPriceChangeStyle(-12.2)).toEqual({
      priceChangeIcon: <ArrowDownOutlined />,
      priceChangeContent: " -12.2",
      priceColor: "#52c41a",
      priceBackgroundColor: "#f6ffed",
    });
  });
});
