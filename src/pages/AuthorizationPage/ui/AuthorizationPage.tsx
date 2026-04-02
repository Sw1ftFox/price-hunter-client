import cls from "./AuthorizationPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  notification,
  Typography,
  type FormProps,
} from "antd";
import { useAuthStore } from "@/features/useAuthStore/useAuthStore";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";
import { useEffect } from "react";

type FieldType = {
  mail: string;
  password: string;
};

type NotificationType = "success" | "info" | "warning" | "error";

const { Title, Text } = Typography;

export const AuthorizationPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const authUser = useAuthStore((state) => state.authUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isError = useAuthStore((state) => state.isError);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      title: "Ошибка авторизации",
      description: errorMessage || "Не получилось войти в аккаунт",
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { mail, password } = values;
    authUser(mail, password, "login", () => {
      navigate("/products");
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && isError) {
      openNotificationWithIcon("error");
    }
  }, [isError]);

  const loading = isLoading && !isError ? <PageLoader /> : null;
  const content =
    !isLoading && !isError ? (
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          minHeight: "100vh",
          padding: "16px",
        }}
        className={cls.authorization}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 480,
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
          styles={{
            body: {
              padding: "32px 24px",
            },
          }}
        >
          <Flex vertical align="center" style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0, color: "#ffd700" }}>
              <UserOutlined /> Вход
            </Title>
            <Text type="secondary">Войдите, чтобы продолжить</Text>
          </Flex>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Электронная почта"
              name="mail"
              rules={[
                { required: true, message: "Введите почту" },
                { type: "email", message: "Некорректный email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="example@mail.com" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="••••••••"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button type="primary" htmlType="submit" block size="large">
                Войти
              </Button>
            </Form.Item>

            <Flex justify="center">
              <Button type="link" href="/" style={{ padding: 0 }}>
                Нет аккаунта? Зарегистрироваться
              </Button>
            </Flex>
          </Form>
        </Card>
      </Flex>
    ) : null;

  return (
    <>
      {loading}
      {contextHolder}
      {content}
    </>
  );
};
