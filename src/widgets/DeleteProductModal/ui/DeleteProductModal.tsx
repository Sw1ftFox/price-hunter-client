import { Modal } from "antd";

interface DeleteProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  handleDelete: () => void;
}

export const DeleteProductModal = ({
  isModalOpen,
  setIsModalOpen,
  handleDelete,
}: DeleteProductModalProps) => {
  const handleOk = () => {
    handleDelete();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Вы уверены, что хотите удалить товар?"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Нет"
      okText="Да"
      okButtonProps={{ type: "default", variant: "outlined" }}
      cancelButtonProps={{
        type: "default",
        color: "red",
        variant: "filled",
      }}
    ></Modal>
  );
};
