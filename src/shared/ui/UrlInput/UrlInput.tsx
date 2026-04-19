import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import type { AddMethodType } from "@/shared/types/AddProductModal";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

interface UrlInputProps {
  method: AddMethodType | null;
}

export const UrlInput = ({ method }: UrlInputProps) => {
  const [url, setUrl] = useState<string>("");
  const previewProduct = useProductsStore((state) => state.previewProduct);
  const clearPreview = useProductsStore((state) => state.clearPreview);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearPreview();
      if (url) {
        if (method === "article") {
          previewProduct(
            `https://www.wildberries.ru/catalog/${url}/detail.aspx`,
          );
        } else if (method === "link") {
          previewProduct(url);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [url, previewProduct, method]);

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
