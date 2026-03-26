import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { Alert, Button } from "antd";

interface ErrorAlertProps {
  errorMessage: string;
  onClick: () => void;
}

export const ErrorAlert = ({ errorMessage, onClick }: ErrorAlertProps) => {
  const isLoading = useProductsStore((state) => state.isLoading);

  return (
    <Alert
      title="Ошибка"
      description={
        <>
          <div>{errorMessage || "Не удалось загрузить товары"}</div>
          <Button
            type="default"
            color="red"
            variant="outlined"
            onClick={onClick}
            style={{ width: "fit-content", margin: "10px auto" }}
            iconPlacement="end"
            loading={isLoading}
          >
            Повторить
          </Button>
        </>
      }
      type="error"
      showIcon
    />
  );
};
