import type { ColumnType } from "antd/es/table";
import { useMemo, useState } from "react";
import type { CompareRow } from "../types/CompareRow";

export const useCheckedColumns = (columns: ColumnType<CompareRow>[]) => {
  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = useMemo(
    () =>
      columns.map(({ key, title }) => ({
        label: title,
        value: key,
      })),
    [columns],
  );

  const checkedColumns = useMemo(
    () =>
      columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key),
      })),
    [checkedList, columns],
  );

  return { checkedList, setCheckedList, options, checkedColumns }
}