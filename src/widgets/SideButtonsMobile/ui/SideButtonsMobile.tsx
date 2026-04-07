import { useEffect, useState } from "react";
import { Button, Drawer, Flex, InputNumber } from "antd";
import {
  BellFilled,
  BellOutlined,
  DeleteOutlined,
  LinkOutlined,
  MenuOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useTrackingNotifications } from "@/shared/hooks/useTrackingNotifications";
import { DeleteProductModal } from "@/widgets/DeleteProductModal";
import type { ProductDetailInfo } from "@/shared/types/Product";
import { generateTelegramLink } from "@/shared/utils/generateTelegramLink";
import { useUserStore } from "@/features/useUserStore/useUserStore";

interface SideButtonsMobileProps {
  className: string;
  product: ProductDetailInfo | null;
  productId: string;
}

export const SideButtonsMobile = ({
  className,
  product,
  productId,
}: SideButtonsMobileProps) => {
  const userId = useUserStore((state) => state.userId);
  const isLoading = useUserStore((state) => state.isLoading);
  const fetchUserId = useUserStore((state) => state.fetchUserId);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  const [open, setOpen] = useState(false);

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

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className={className}>
      <Button
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
      />
      <Drawer
        title="Меню действий"
        placement="right"
        onClose={onClose}
        open={open}
        size={250}
      >
        <Flex gap="small" vertical>
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
                Не отслеживать
              </Button>
              <Button
                type="link"
                href={generateTelegramLink(userId)}
                disabled={isLoading}
                target="_blank"
                color="default"
                variant="outlined"
                style={{
                  marginBottom: 40,
                  width: "100%",
                }}
              >
                Телеграмм бот
                <LinkOutlined />
              </Button>
            </>
          )}
        </Flex>
      </Drawer>
      <DeleteProductModal
        handleDelete={handleDelete}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};
