interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; [key: string]: unknown }[];
  label?: string;
}

export const CustomTooltip = ({
  active = false,
  payload = [],
  label = "",
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ffd700",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        <p style={{ margin: 0 }}> {`Дата: ${label}`}</p>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {" "}
          {`Цена: ${payload[0].value} ₽`}
        </p>
      </div>
    );
  }
  return null;
};
