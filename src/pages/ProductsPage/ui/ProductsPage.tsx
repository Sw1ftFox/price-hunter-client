import classNames from 'classnames';
import cls from './ProductsPage.module.scss';

interface ProductsPageProps {
  className?: string;
}

const ProductsPage = ({ className }: ProductsPageProps) => {
    return (
        <div className={classNames(cls.ProductsPage, className)}>
      ProductsPage
        </div>
    );
};

export default ProductsPage;