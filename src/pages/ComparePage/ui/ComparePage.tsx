import {
  App,
  Breadcrumb,
  Button,
  Checkbox,
  Table,
  Typography,
  type CheckboxOptionType,
  type TableColumnsType,
} from "antd";
import {
  ArrowLeftOutlined,
  BarChartOutlined,
  ClearOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { CardCover } from "@/shared/ui/CardCover/CardCover";
import cls from "./ComparePage.module.scss";
import { getPriceChangeStyle } from "@/shared/utils/getPriceChangeStyle";
import { ProductChart } from "@/widgets/ProductChart";
import { useMemo, useState } from "react";
import type { ProductDetailInfo } from "@/shared/types/Product";
import { useCompareStore } from "@/features/useCompareStore/useCompareStore";
import { getPricesFromHistory } from "@/shared/utils/getPricesFromHistory";
import { Link, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface CompareRow {
  key: string;
  label: string;
  [productId: string]: string | number | React.ReactNode;
}

const characteristics = [
  {
    key: "image",
    label: "Фото",
    getValue: (p: ProductDetailInfo) => (
      <CardCover
        className={cls.product__image}
        name="Фото товара"
        imageUrl={p.image}
        key={p.id}
      />
    ),
  },
  {
    key: "name",
    label: "Название",
    getValue: (p: ProductDetailInfo) => (
      <div
        style={{
          fontSize: "1.1rem",
          textWrap: "wrap",
          maxWidth: 250,
        }}
      >
        {p.name}
      </div>
    ),
  },
  {
    key: "nmId",
    label: "Артикул",
    getValue: (p: ProductDetailInfo) => (
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        {p.nmId}
      </div>
    ),
  },
  {
    key: "brand",
    label: "Бренд",
    getValue: (p: ProductDetailInfo) => (
      <div
        style={{
          fontSize: "1.1rem",
        }}
      >
        {p.brand}
      </div>
    ),
  },
  {
    key: "marketplace",
    label: "Маркетплейс",
    getValue: (p: ProductDetailInfo) => (
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          color: `${p.marketplace === "wb" ? "#be1fb6" : "#4150f5"}`,
        }}
      >
        {p.marketplace.toUpperCase()}
      </div>
    ),
  },
  {
    key: "currentPrice",
    label: "Цена",
    getValue: (p: ProductDetailInfo) => (
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        {p.currentPrice} ₽
      </div>
    ),
  },
  {
    key: "priceChangePercent",
    label: "Изменение %",
    getValue: (p: ProductDetailInfo) => {
      const {
        priceChangeContent,
        priceColor,
        priceBackgroundColor,
        priceChangeIcon,
      } = getPriceChangeStyle(p.priceChangePercent);
      return (
        <div
          style={{
            color: priceColor,
            background: priceBackgroundColor,
            padding: "2px 8px",
            borderRadius: "12px",
            display: "inline-block",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {priceChangeIcon}
          {priceChangeContent} %
        </div>
      );
    },
  },
  {
    key: "minPrice",
    label: "Мин. цена",
    getValue: (p: ProductDetailInfo) => {
      const minPrice = Math.min(...getPricesFromHistory(p.priceHistory));
      return (
        <Text type="success" style={{ fontSize: "1rem", fontWeight: 600 }}>
          {minPrice} ₽
        </Text>
      );
    },
  },
  {
    key: "maxPrice",
    label: "Макс. цена",
    getValue: (p: ProductDetailInfo) => {
      const maxPrice = Math.max(...getPricesFromHistory(p.priceHistory));
      return (
        <Text type="danger" style={{ fontSize: "1rem", fontWeight: 600 }}>
          {maxPrice} ₽
        </Text>
      );
    },
  },
  {
    key: "threshold",
    label: "Уведомление",
    getValue: (p: ProductDetailInfo) => (
      <Text type="warning" style={{ fontSize: "1rem", fontWeight: 600 }}>
        {p.notification.tresholdPrice
          ? p.notification.tresholdPrice + " ₽"
          : "---"}
      </Text>
    ),
  },
  {
    key: "prices",
    label: "График",
    getValue: (p: ProductDetailInfo) => (
      <ProductChart priceHistory={p.priceHistory} />
    ),
  },
  {
    key: "ulr",
    label: "Ссылка",
    getValue: (p: ProductDetailInfo) => (
      <Button
        type="link"
        href={p.url}
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
    ),
  },
];

const ComparePage = () => {
  const selectedProducts = useCompareStore((state) => state.selectedProducts);
  const clearSelectedProducts = useCompareStore(
    (state) => state.clearSelectedProducts,
  );
  const { message } = App.useApp();
  const navigate = useNavigate();

  const rows: TableColumnsType<CompareRow> = useMemo(
    () =>
      characteristics.map((ch) => {
        const row = { key: ch.key, label: ch.label };
        selectedProducts.forEach((p) => {
          row[p.id] = ch.getValue(p);
        });
        return row;
      }),
    [selectedProducts],
  );

  const columns = useMemo(
    () => [
      {
        title: "Характеристика",
        dataIndex: "label",
        key: "label",
        fixed: "left",
      },
      ...selectedProducts.map((p, index) => ({
        title: `Товар ${index + 1}`,
        dataIndex: p.id,
        key: p.id,
      })),
    ],
    [selectedProducts],
  );

  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = useMemo(
    () =>
      columns.map(({ key, title }) => ({
        label: title,
        value: key,
      })),
    [columns],
  );

  const newColumns = useMemo(
    () =>
      columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key as string),
      })),
    [checkedList, columns],
  );

  return (
    <div
      style={{
        padding: "1rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <Link to="/products">
                <ArrowLeftOutlined /> Вернуться назад
              </Link>
            ),
          },
          {
            title: (
              <Link to="/products">
                <HomeOutlined /> Главная
              </Link>
            ),
          },
          {
            title: (
              <Link to="/products/compare">
                <BarChartOutlined /> Сравнение
              </Link>
            ),
          },
        ]}
      ></Breadcrumb>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          flexWrap: "wrap",
          rowGap: "0.5rem",
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 600,
            borderLeft: "4px solid #FFD700",
            paddingLeft: "0.75rem",
          }}
        >
          Режим сравнения
        </Title>
        <Button
          color="danger"
          variant="outlined"
          icon={<ClearOutlined />}
          style={{
            fontWeight: 600,
          }}
          onClick={() => {
            if (selectedProducts.length > 0) {
              clearSelectedProducts();
              message.success("Список сравнения успешно очищен!");
              navigate("/products");
            } else {
              message.warning("Вы ничего не сравниваете!");
            }
          }}
        >
          Очистить список сравнения
        </Button>
      </div>

      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />

      <Table<CompareRow>
        bordered
        pagination={false}
        columns={newColumns}
        dataSource={rows}
        rowKey="key"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ComparePage;
