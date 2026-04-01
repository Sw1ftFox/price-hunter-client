import { useNavigate } from "react-router-dom";
import { ProductList } from "@/widgets/ProductList";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { useState } from "react";
import { AddProductModal } from "@/widgets/AddProductModal";
import { Header } from "@/widgets/Header";
import { type ProductSortType } from "@/shared/types/ProductSort";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";

const ProductsPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [term, setTerm] = useState<string>("");
  const [sortType, setSortType] = useState<ProductSortType | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const onExit = () => {
    logout(() => {
      navigate("/login");
    });
  };

  return (
    <div
      style={{
        padding: "1rem",
        minHeight: "100vh",
        width: "100vw",
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
            href: "/login",
            title: (
              <>
                <ArrowLeftOutlined /> Вернуться назад
              </>
            ),
            onClick: onExit,
          },
          {
            href: "/products",
            title: (
              <>
                <HomeOutlined /> Главная
              </>
            ),
          },
        ]}
      ></Breadcrumb>

      <Header
        setTerm={setTerm}
        setSortType={setSortType}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <ProductList term={term} sortType={sortType} />
      <AddProductModal
        isOpenModal={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
      />
    </div>
  );
};

export default ProductsPage;
