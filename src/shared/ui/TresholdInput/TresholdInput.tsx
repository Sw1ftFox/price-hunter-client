import { Collapse, Form, InputNumber, type InputNumberProps } from "antd";
import { useState } from "react";

interface TresholdInputProps {
  isNotificationActive: boolean;
}

const formatter: InputNumberProps<number>["formatter"] = (value) => {
  const [start, end] = `${value}`.split(".") || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${end ? `${v}.${end}` : `${v}`}`;
};

export const TresholdInput = ({ isNotificationActive }: TresholdInputProps) => {
  const [treshold, setTreshold] = useState<number | null>(null);
  return (
    <Collapse
      activeKey={isNotificationActive ? "1" : []}
      ghost
      style={{ border: "none" }}
      styles={{
        header: {
          padding: 0,
          marginTop: 6,
        },
        body: {
          padding: 0,
        },
        icon: {
          display: "none",
        },
      }}
      items={[
        {
          key: 1,
          label: "",
          children: (
            <Form.Item
              label="Ценовой порог: "
              name="treshold"
              rules={[
                {
                  required: isNotificationActive,
                  message: "Это поле обязательно для заполнения!",
                },
              ]}
            >
              <InputNumber
                prefix="₽"
                placeholder="Введите ценовой порог"
                style={{ width: "100%" }}
                formatter={formatter}
                value={treshold}
                onChange={setTreshold}
              />
            </Form.Item>
          ),
        },
      ]}
    ></Collapse>
  );
};
