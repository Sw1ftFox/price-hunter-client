import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { useTrackingNotifications } from "@/shared/hooks/useTrackingNotifications";
import type { ProductDetailInfo } from "@/shared/types/Product";
import { generateTelegramLink } from "@/shared/utils/generateTelegramLink";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import {
  BellFilled,
  BellOutlined,
  DeleteOutlined,
  LinkOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, InputNumber } from "antd";
import { useState } from "react";

interface SideButtonsProps {
  className: string;
  product: ProductDetailInfo | null;
  productId: string;
}

export const SideButtons = ({
  className,
  product,
  productId,
}: SideButtonsProps) => {
  const user = useAuthStore((state) => state.user);

  const {
    isTrackingActive,
    showThresholdInput,
    handleStartTracking,
    threshold,
    setThreshold,
    handleUpdate,
    handleDelete,
    handleConfirm,
    handleCancel,
    handleStopTracking,
  } = useTrackingNotifications(productId, product?.notification.enabled);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
            onClick={handleCancel}
          >
            Отменить
          </Button>
        </>
      )}

      {isTrackingActive && (
        <>
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
          <Button
            type="link"
            href={generateTelegramLink(user?.id, productId, threshold)}
            color="default"
            variant="outlined"
            style={{
              marginBottom: 40,
              width: "100%",
            }}
          >
            Перейти в телеграмм бота
            <LinkOutlined />
          </Button>
        </>
      )}

      <DeleteProductModal
        handleDelete={handleDelete}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
      />
    </Flex>
  );
};
