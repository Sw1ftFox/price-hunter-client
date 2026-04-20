import type { ColumnType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import type { CompareRow } from "../types/CompareRow";

export const useCheckedColumns = (columns: ColumnType<CompareRow>[]) => {
  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  useEffect(() => {
    const allKeys = columns.map((item) => item.key).filter(Boolean);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckedList((prev) => {
      const filteredPrev = prev.filter(key => allKeys.includes(key));
      const newKeys = allKeys.filter(key => !filteredPrev.includes(key));
      return [...filteredPrev, ...newKeys];
    });
  }, [columns]);

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