import { Button, Divider, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { RobotOutlined } from "@ant-design/icons";
// eslint-disable-next-line max-len
import { useRecommendationsStore } from "@/features/useRecommendationsStore/useRecommendationsStore";
import { useCompareStore } from "@/features/useCompareStore/useCompareStore";
import { useTextType } from "@/shared/hooks/useTextType";

export const AIRecommendation = () => {
  const [isRecomendationActive, setIsRecomendationActive] = useState(false);
  const recommendation = useRecommendationsStore(
    (state) => state.recommendation,
  );
  const fetchRecommendation = useRecommendationsStore(
    (state) => state.fetchRecommendation,
  );
  const clearRecommendation = useRecommendationsStore(
    (state) => state.clearRecommendation,
  );
  const isError = useRecommendationsStore((state) => state.isError);
  const isLoading = useRecommendationsStore((state) => state.isLoading);

  const selectedProducts = useCompareStore((state) => state.selectedProducts);

  const { displayed } = useTextType(
    recommendation,
    20,
    isError,
    clearRecommendation,
  );

  const handleRequest = () => {
    setIsRecomendationActive(true);
    const selectedIds = selectedProducts.map((product) => product.id);
    fetchRecommendation(selectedIds);
  };

  return (
    <>
      <Flex gap="medium" wrap>
        <Button
          icon={<RobotOutlined />}
          color="green"
          variant="outlined"
          onClick={handleRequest}
          disabled={isLoading}
        >
          Спросить у нейросети?
        </Button>
        <TextArea
          placeholder="Здесь будет рекомендация..."
          autoSize={{ minRows: 1, maxRows: 9 }}
          style={{
            transform: isRecomendationActive
              ? "translateY(0px)"
              : "translateY(40px)",
            marginBottom: isRecomendationActive ? 0 : -40,
            opacity: isRecomendationActive ? 1 : 0,
            backgroundColor: "white",
            cursor: "default",
          }}
          styles={{
            textarea: {
              color: isError ? "#ff000091" : "black",
            },
          }}
          value={displayed}
          status={isError ? "error" : ""}
          disabled
        />
      </Flex>
      <Divider style={{ marginTop: 0, marginBottom: 5 }} />
    </>
  );
};
