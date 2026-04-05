import { useNotificationsStore } from "@/features/useNotificationsStore/useNotificationsStore";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { App } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseTrackingNotificationsType {
  isTrackingActive: boolean,
  showThresholdInput: boolean,
  handleStartTracking: () => void,
  handleStopTracking: () => void,
  threshold: number | null,
  setThreshold: (prevThreshold: number | null) => void,
  handleUpdate: () => void,
  handleDelete: () => void,
  handleConfirm: () => void,
  handleCancel: () => void
}

export const useTrackingNotifications = (
  productId: string,
  initialTrakingStatus: boolean = false): UseTrackingNotificationsType => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const fetchProductDetailInfo = useProductsStore((state) => state.fetchProductDetailInfo);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  const addNotification = useNotificationsStore(
    (state) => state.addNotification,
  );
  const deleteNotification = useNotificationsStore(
    (state) => state.deleteNotification,
  );

  const [isTrackingActive, setIsTrackingActive] = useState(initialTrakingStatus);
  const [showThresholdInput, setShowThresholdInput] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(null);

  const handleUpdate = () => {
    if (productId) {
      fetchProductDetailInfo(productId);
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

  const handleCancel = () => {
    setShowThresholdInput(false);
    setThreshold(null);
  }

  return {
    isTrackingActive,
    showThresholdInput,
    handleStartTracking,
    handleStopTracking,
    threshold,
    setThreshold,
    handleUpdate,
    handleDelete,
    handleConfirm,
    handleCancel
  }
}