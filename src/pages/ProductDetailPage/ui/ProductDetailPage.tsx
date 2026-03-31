import { ProductChart } from "@/widgets/ProductChart";
import { ProductForecast } from "@/widgets/ProductForecast";
import { ProductInfo } from "@/widgets/ProductInfo";
import { SideButtons } from "@/widgets/SideButtons";
import { SideButtonsMobile } from "@/widgets/SideButtonsMobile";
import { Col, Flex, Row, Spin } from "antd";
import cls from "./ProductDetailPage.module.scss";
import { useProductsStore } from "@/features/useProductsStore/useProductsStore";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const fetchProductDetailInfo = useProductsStore(
    (state) => state.fetchProductDetailInfo,
  );
  const currentProduct = useProductsStore((state) => state.currentProduct);

  const { id } = useParams();
  const isLoading = useProductsStore((state) => state.isLoading);

  return (
    <>
      <Spin description="Loading" size="large" spinning={isLoading}>
        <Row
          gutter={[16, 16]}
          style={{
            padding: "1rem",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9",
            width: "100%",
            marginInline: 0,
          }}
        >
          <Col className={cls.content} xs={24} md={18}>
            <Flex gap="medium" vertical>
              <ProductInfo
                fetchProduct={fetchProductDetailInfo}
                product={currentProduct}
                productId={id || ""}
              />
              <ProductChart priceHistory={currentProduct?.priceHistory || []} />
              <ProductForecast
                priceHistory={currentProduct?.priceHistory || []}
              />
            </Flex>
          </Col>
          <Col md={6}>
            <SideButtons
              key={currentProduct?.id}
              className={cls.side__btns}
              fetchProduct={fetchProductDetailInfo}
              product={currentProduct}
              productId={id || ""}
            />
            <SideButtonsMobile className={cls.side__btns__mobile} />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default ProductDetailPage;
