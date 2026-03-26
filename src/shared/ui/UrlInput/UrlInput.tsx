import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import type { AddMethodType } from "@/shared/types/AddProductModal";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

interface UrlInputProps {
  method: AddMethodType | null;
}

export const UrlInput = ({ method }: UrlInputProps) => {
  const [url, setUrl] = useState<string>("");
  const [debouncedUrl, setDebouncedUrl] = useState<string>("");
  const previewProduct = useProductsStore((state) => state.previewProduct);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUrl(url);
      previewProduct(debouncedUrl);
    }, 500);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <Form.Item
      name="url"
      label={method === "article" ? "Введите артикул" : "Введите ссылку" + ": "}
      rules={[
        { required: true, message: "Это поле обязательно для заполнения!" },
      ]}
    >
      <Input
        placeholder="Что ищем, артикул или ссылку?"
        value={url}
        onChange={(event) => {
          setUrl(event.target.value);
        }}
      />
    </Form.Item>
  );
};
