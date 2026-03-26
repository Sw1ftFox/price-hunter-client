import classNames from "classnames";
import cls from "./ImageStub.module.scss";
import type { CSSProperties } from "react";
import { FileImageOutlined } from "@ant-design/icons";

interface ImageStubProps {
  className?: string;
  style?: CSSProperties;
  imageSize?: string;
}

export const ImageStub = ({ className, style, imageSize }: ImageStubProps) => {
  return (
    <div style={style} className={classNames(cls.ImageStub, className)}>
      <FileImageOutlined style={{ fontSize: imageSize, opacity: 0.5 }} />
    </div>
  );
};
