import { useState } from "react";
import { Button, Drawer, Flex, InputNumber, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";

interface SideButtonsMobileProps {
  className: string;
}

export const SideButtonsMobile = ({ className }: SideButtonsMobileProps) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [showThresholdInput, setShowThresholdInput] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(null);

  const handleStartTracking = () => {
    setShowThresholdInput(true);
  };

  const handleConfirm = () => {
    if (threshold && threshold > 0) {
      // здесь сохранение уведомления (например, в сторе)
      setIsTrackingActive(true);
      setShowThresholdInput(false);
      message.success(`Уведомление установлено на ${threshold} ₽`);
    } else {
      message.warning("Введите корректный порог");
    }
  };

  const handleStopTracking = () => {
    // удаление уведомления
    setIsTrackingActive(false);
    setThreshold(null);
    message.info("Отслеживание отключено");
  };

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
          >
            Обновить
          </Button>
          <Button
            type="primary"
            danger
            ghost
            style={{
              width: "100%",
            }}
          >
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
              Перестать отслеживать
            </Button>
          )}
        </Flex>
      </Drawer>
    </div>
  );
};
