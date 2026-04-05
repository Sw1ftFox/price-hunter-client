import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { type FormProps } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type NotificationType = "success" | "info" | "warning" | "error";

type AuthType = "register" | "login";

type ErrorObjectType = {
  title: string,
  description: string,
}

type FieldType = {
  mail: string;
  password: string;
  confirm: string;
};

export function useAuth(api: NotificationInstance, errorObj: ErrorObjectType, authType: AuthType) {

  const navigate = useNavigate();

  const authUser = useAuthStore((state) => state.authUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isError = useAuthStore((state) => state.isError);

  const openNotification = (type: NotificationType) => {
    api[type](errorObj);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { mail, password } = values;
    authUser(mail, password, authType, () => {
      navigate("/products");
    });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      openNotification("error");
    }
  }, [isError]);

  return { onFinish }
}