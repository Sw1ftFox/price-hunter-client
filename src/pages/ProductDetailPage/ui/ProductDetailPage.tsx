import classNames from 'classnames';
import cls from './ProductDetailPage.module.scss';

interface ProductDetailPageProps {
  className?: string;
}

const ProductDetailPage = ({ className }: ProductDetailPageProps) => {
    return (
        <div className={classNames(cls.ProductDetailPage, className)}>
      ProductDetailPage
        </div>
    );
};

export default ProductDetailPage;