import { Col, Row, Skeleton } from "antd";

const skeletonCards = Array.from({ length: 6 });

export const SkeletonCards = () => {
  return (
    <Row gutter={[16, 16]}>
      {skeletonCards.map((_, i) => (
        <Col key={`skeleton-${i}`} xs={12} sm={8} md={6} xl={4}>
          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <Skeleton.Image
              active
              styles={{
                root: {
                  width: "100%",
                },
              }}
              style={{ width: "100%", height: 150, borderRadius: 0 }}
            />
            <div style={{ padding: 12 }}>
              <Skeleton active title paragraph={{ rows: 2 }} />
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
