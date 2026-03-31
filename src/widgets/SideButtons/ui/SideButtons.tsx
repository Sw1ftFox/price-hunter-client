import { useNotificationsStore } from "@/features/useNotificationsStore/useNotificationsStore";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import type { ProductDetailInfo } from "@/shared/types/Product";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import {
  BellFilled,
  BellOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { App, Button, Flex, InputNumber } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SideButtonsProps {
  className: string;
  product: ProductDetailInfo | null;
  fetchProduct: (productId: string) => void;
  productId: string;
}

export const SideButtons = ({
  className,
  product,
  fetchProduct,
  productId,
}: SideButtonsProps) => {
  const { message } = App.useApp();

  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  const addNotification = useNotificationsStore(
    (state) => state.addNotification,
  );
  const deleteNotification = useNotificationsStore(
    (state) => state.deleteNotification,
  );

  const navigate = useNavigate();

  const [isTrackingActive, setIsTrackingActive] = useState(
    product?.notification.enabled || false,
  );
  const [showThresholdInput, setShowThresholdInput] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(
    product?.notification.tresholdPrice || null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleUpdate = () => {
    if (productId) {
      fetchProduct(productId);
      message.success(`Информация о товаре обновлена`);
    }
  };

  const handleDelete = () => {
    if (productId) {
      deleteProduct(productId);
      message.success(`Товар успешно удален`);
      navigate("/products");
    }
  };

  const handleStartTracking = () => {
    setShowThresholdInput(true);
  };

  const handleConfirm = () => {
    if (threshold && threshold > 0 && productId) {
      addNotification(productId, threshold, true);
      setIsTrackingActive(true);
      setShowThresholdInput(false);
      message.success(`Уведомление установлено на ${threshold} ₽`);
    } else {
      message.warning("Введите корректный порог");
    }
  };

  const handleStopTracking = () => {
    if (productId) {
      deleteNotification(productId, false);
      setIsTrackingActive(false);
      setThreshold(null);
      message.info("Отслеживание отключено");
    }
  };

  return (
    <Flex
      gap="small"
      vertical
      align="flex-end"
      className={className}
      style={{ position: "sticky", top: 20 }}
    >
      <Button
        type="link"
        href="/products"
        color="default"
        variant="outlined"
        style={{
          marginBottom: 40,
          width: "100%",
        }}
      >
        Назад
      </Button>
      <Button
        color="green"
        variant="filled"
        style={{
          border: "1px solid green",
          width: "100%",
        }}
        onClick={handleUpdate}
      >
        <ReloadOutlined />
        Обновить
      </Button>
      <Button
        type="primary"
        danger
        ghost
        style={{ width: "100%" }}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <DeleteOutlined />
        Удалить
      </Button>
      {!isTrackingActive && !showThresholdInput && (
        <Button
          color="orange"
          variant="filled"
          onClick={handleStartTracking}
          style={{
            border: "1px solid orange",
            width: "100%",
          }}
        >
          <BellOutlined />
          Отслеживать
        </Button>
      )}

      {showThresholdInput && !isTrackingActive && (
        <>
          <InputNumber
            prefix="₽"
            placeholder="Введите ценовой порог"
            value={threshold}
            onChange={setThreshold}
            style={{
              width: "100%",
            }}
          />
          <Button
            color="green"
            variant="filled"
            onClick={handleConfirm}
            style={{
              width: "100%",
            }}
          >
            Подтвердить
          </Button>
          <Button
            type="primary"
            danger
            ghost
            style={{ width: "100%" }}
            onClick={() => {
              setShowThresholdInput(false);
              setThreshold(null);
            }}
          >
            Отменить
          </Button>
        </>
      )}

      {isTrackingActive && (
        <Button
          color="volcano"
          variant="filled"
          onClick={handleStopTracking}
          style={{
            width: "100%",
          }}
        >
          <BellFilled />
          Перестать отслеживать
        </Button>
      )}

      <DeleteProductModal
        handleDelete={handleDelete}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
      />
    </Flex>
  );
};
