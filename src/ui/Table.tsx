import { ReactNode } from "react";
import "./table.css";
import { join } from "./helpers";

export type ValueOf<Row> = Row[keyof Row];

// TODO clean: fix with a mapped type after re-reading Gabriel's Typescript course
export type Column<Row> = {
  label: string;
  key: keyof Row;
  isDisabled?: (row: Row) => boolean;
  render: (row: Row, rowIndex: number) => ReactNode;
  total?: (rows: Row[]) => ReactNode;
};

type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  header?: () => ReactNode;
  hasFooter?: boolean;
};

export function Table<Row>({
  columns,
  rows,
  header: Header,
  hasFooter,
}: TableProps<Row>) {
  return (
    <table>
      <thead>
        {Header ? (
          <Header />
        ) : (
          <tr>
            {columns.map((column) => (
              <th key={`header--${String(column.key)}`}>{column.label}</th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row--${rowIndex}`}>
            {columns.map((column) => {
              const isDisabled = column.isDisabled && column.isDisabled(row);
              return (
                <td key={`cell--${String(column.key)}--${rowIndex}`} className={join(isDisabled ? 'cell--is-disabled' : undefined)}>
                  {isDisabled ? undefined : <div className="table-cell">{column.render(row, rowIndex)}</div>}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
      {hasFooter ? (
        <tfoot>
          <tr>
            {columns.map((column) => (
              <td key={`footer--${String(column.key)}`}>
                <div className="table-cell">
                  {column.total ? column.total(rows) : undefined}
                </div>
              </td>
            ))}
          </tr>
        </tfoot>
      ) : undefined}
    </table>
  );
}
