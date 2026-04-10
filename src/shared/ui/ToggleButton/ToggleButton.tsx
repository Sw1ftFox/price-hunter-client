import { SlidersOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { ReactNode } from "react";

interface ToggleButtonProps {
  renderCondition: boolean;
  onToggle: () => void;
  contentFirstButton: string | ReactNode;
  contentSecondButton: string | ReactNode;
}

export const ToggleButton = ({
  renderCondition,
  onToggle,
  contentFirstButton,
  contentSecondButton,
}: ToggleButtonProps) => {
  return (
    <>
      {renderCondition ? (
        <Button
          color="danger"
          variant="outlined"
          icon={<SlidersOutlined />}
          style={{
            fontWeight: 600,
          }}
          onClick={onToggle}
        >
          {contentFirstButton}
        </Button>
      ) : (
        <Button
          color="default"
          variant="outlined"
          icon={<SlidersOutlined />}
          style={{
            fontWeight: 600,
          }}
          onClick={onToggle}
        >
          {contentSecondButton}
        </Button>
      )}
    </>
  );
};
