export interface CompareRow {
  key: string;
  label: string;
  [productId: string]: string | number | React.ReactNode;
}