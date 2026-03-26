import { useNavigate } from "react-router-dom";
import { ProductList } from "@/widgets/ProductList";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { useState } from "react";
import { AddProductModal } from "@/widgets/AddProductModal";
import { BackLink } from "@/shared/ui/BackLink/BackLink";
import { Header } from "@/widgets/Header";
import { type ProductSortType } from "@/shared/types/ProductSort";

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
      <BackLink onClick={onExit} />

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
