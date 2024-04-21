import { useState } from "react";
import { InputNumber } from "./InputNumber";
import { Column, Table } from "./Table";

export type ColumnWithTotal<Row> = Column<Row> & {
  total?: (values: number[]) => JSX.Element;
};

type EditableTableProps<T> = {
  columns: ColumnWithTotal<T>[];
  rowCount: number;
  hasFooter?: boolean;
};

type CellValue = number;

export function EditableTable<Row>({
  columns,
  rowCount,
  hasFooter,
}: EditableTableProps<Row>) {
  type Key = keyof Row;
  type NumberRow = Record<Key, CellValue>;

  const anEmptyRow = (): NumberRow => {
    // CAUTION: this cast is type-unsafe
    return Object.fromEntries(
      columns.map((column) => [column.key, 0]),
    ) as NumberRow;
  };

  const [state, setState] = useState<NumberRow[]>(
    Array(rowCount).fill(anEmptyRow()),
  );
  const updateCell = (value: CellValue, rowIndex: number, columnKey: Key) => {
    setState(
      state.map((row, index) =>
        index === rowIndex ? { ...row, [columnKey]: value } : row,
      ),
    );
  };

  // TODO: handle other input types?
  const editableColumns = columns.map(
    (column): ColumnWithTotal<NumberRow> => ({
      ...column,
      render: (value, rowIndex) => (
        <InputNumber
          value={value}
          onChange={(updatedValue) =>
            updateCell(updatedValue, rowIndex, column.key)
          }
        />
      ),
    }),
  );

  return <Table columns={editableColumns} rows={state} hasFooter={hasFooter} />;
}
