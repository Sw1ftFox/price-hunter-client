import {
  ADD_PRODUCT_METHODS,
  type AddMethodType,
} from "@/shared/types/AddProductModal";
import { Form, Radio } from "antd";
import { useState } from "react";

export const AddMethod = () => {
  const [method, setMethod] = useState<AddMethodType | null>(null);

  return (
    <Form.Item
      name="addMethod"
      label="Выберите способ добавления"
      rules={[{ required: true, message: "Выберите способ добавления!" }]}
    >
      <Radio.Group
        onChange={(event) => {
          setMethod(event.target.value);
        }}
        block
        options={[
          { label: ADD_PRODUCT_METHODS.article, value: "article" },
          { label: ADD_PRODUCT_METHODS.link, value: "link" },
        ]}
        value={method}
        optionType="button"
        buttonStyle="solid"
        style={{
          fontWeight: 600,
        }}
      />
    </Form.Item>
  );
};
