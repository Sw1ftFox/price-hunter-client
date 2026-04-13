import { Link, useNavigate } from "react-router-dom";
import { ProductList } from "@/widgets/ProductList";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { useState } from "react";
import { AddProductModal } from "@/widgets/AddProductModal";
import { Header } from "@/widgets/Header";
import { type ProductSortType } from "@/shared/types/ProductSort";
import { App, Breadcrumb, Button, FloatButton } from "antd";
import {
  ArrowLeftOutlined,
  BarChartOutlined,
  CheckOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useCompareStore } from "@/features/useCompareStore/useCompareStore";

const ProductsPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [term, setTerm] = useState<string>("");
  const [sortType, setSortType] = useState<ProductSortType | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const isCompareActive = useCompareStore((state) => state.isCompareActive);
  const selectedIds = useCompareStore((state) => state.selectedIds);
  const fetchSelectedProducts = useCompareStore(
    (state) => state.fetchSelectedProducts,
  );
  const setCompareMode = useCompareStore((state) => state.setCompareMode);
  const { message } = App.useApp();

  const onExit = () => {
    logout(() => {
      navigate("/login");
    });
  };

  const handleSubmit = () => {
    if (selectedIds.size > 0) {
      const ids = Array.from(selectedIds);
      fetchSelectedProducts(ids);
      setCompareMode(false);
      message.success("Товары добавлены в сравнение!");
    } else {
      message.warning("Вы не выбрали товары для сравнения!");
    }
  };

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
              <Link to="/login">
                <ArrowLeftOutlined /> Выйти
              </Link>
            ),
            onClick: onExit,
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

      <Header
        setTerm={setTerm}
        setSortType={setSortType}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      {isCompareActive ? (
        <Button
          color="green"
          variant="outlined"
          icon={<CheckOutlined />}
          style={{
            fontWeight: 600,
            width: "fit-content",
            margin: "0 auto",
          }}
          onClick={handleSubmit}
        >
          Подтвердить выбор для сравнения
        </Button>
      ) : null}

      <ProductList term={term} sortType={sortType} />

      <AddProductModal
        isOpenModal={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
      />
      <FloatButton.BackTop />
    </div>
  );
};

export default ProductsPage;
