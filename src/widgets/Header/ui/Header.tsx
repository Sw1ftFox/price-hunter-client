import { useCompareStore } from "@/features/useCompareStore/useCompareStore";
import {
  PRODUCT_LABEL,
  ProductSort,
  type ProductSortType,
} from "@/shared/types/ProductSort";
import { ToggleButton } from "@/shared/ui/ToggleButton/ToggleButton";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Typography } from "antd";

interface HeaderProps {
  setTerm: (newTerm: string) => void;
  setSortType: (newSortType: ProductSortType) => void;
  setIsAddModalOpen: (isAddModalOpen: boolean) => void;
}

const { Title } = Typography;

export const Header = ({
  setTerm,
  setSortType,
  setIsAddModalOpen,
}: HeaderProps) => {
  const setCompareMode = useCompareStore((state) => state.setCompareMode);
  const isCompareActive = useCompareStore((state) => state.isCompareActive);

  const handleChangeCompareMode = () => {
    setCompareMode(!isCompareActive);
  };

  return (
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
        Мои товары:
      </Title>

      <Input
        placeholder="Поиск"
        allowClear
        style={{ flex: 1, minWidth: 200, maxWidth: 300 }}
        onChange={(e) => setTerm(e.target.value)}
      />

      <Select
        style={{ minWidth: 200 }}
        placeholder="Сортировать по:"
        onChange={(value) => setSortType(value)}
        options={Object.values(ProductSort).map((value) => ({
          value,
          label: PRODUCT_LABEL[value],
        }))}
      ></Select>

      <ToggleButton
        renderCondition={isCompareActive}
        onToggle={handleChangeCompareMode}
        contentFirstButton="Выйти из сравнения"
        contentSecondButton="Режим сравнения"
      />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          color: "#000",
          fontWeight: 600,
          border: "none",
          boxShadow: "none",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#FFC107")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#FFD700")
        }
        onClick={() => setIsAddModalOpen(true)}
      >
        Добавить товар
      </Button>
    </div>
  );
};
