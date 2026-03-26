import { Checkbox, Form } from "antd";
import { useState } from "react";

export const NotificationCheckbox = () => {
  const [isNotificationActive, setIsNotificationActive] =
    useState<boolean>(false);
  return (
    <Form.Item
      name="isNotificationActive"
      valuePropName="checked"
      style={{ margin: 0 }}
    >
      <Checkbox
        checked={isNotificationActive}
        onChange={() => {
          setIsNotificationActive((prev) => !prev);
        }}
      >
        Хотите получать уведомления?
      </Checkbox>
    </Form.Item>
  );
};
