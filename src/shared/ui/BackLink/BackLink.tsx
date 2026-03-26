import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface BackLinkProps {
  onClick?: () => void;
}

export const BackLink = ({ onClick }: BackLinkProps) => {
  return (
    <Link
      to="/login"
      onClick={onClick}
      style={{
        width: "fit-content",
        textDecoration: "none",
        color: "#FFD700",
        fontWeight: 500,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFC107")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#FFD700")}
    >
      <ArrowLeftOutlined /> Вернуться назад
    </Link>
  );
};
