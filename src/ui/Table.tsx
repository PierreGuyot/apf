import { ReactNode } from "react";
import "./table.css";
import { join, patchArray } from "./helpers/helpers";

export type ValueOf<Row> = Row[keyof Row];

type Alignment = "left" | "center";

// TODO clean: fix with a mapped type after re-reading Gabriel's Typescript course
export type Column<Row> = {
  label: string;
  key: keyof Row;
  alignment?: Alignment; // 'center' by default

  isDisabled?: (row: Row) => boolean;
  render: (row: Row, onChange: (value: ValueOf<Row>) => void) => ReactNode;
  total?: (rows: Row[]) => ReactNode;
};

type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  header?: () => ReactNode;
  hasFooter?: boolean;
  onChange: (rows: Row[]) => void;
};

export function Table<Row>({
  columns,
  rows,
  header: Header,
  hasFooter,
  onChange,
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
              const alignment = column.alignment ?? "center";

              return (
                <td
                  key={`cell--${String(column.key)}--${rowIndex}`}
                  className={join(
                    isDisabled ? "table-cell--is-disabled" : undefined,
                  )}
                >
                  {isDisabled ? undefined : (
                    <div
                      className={join(
                        "table-cell",
                        `table-cell--alignment-${alignment}`,
                      )}
                    >
                      {column.render(row, (value) =>
                        onChange(
                          patchArray(rows, rowIndex, (row) => ({
                            ...row,
                            [column.key]: value,
                          })),
                        ),
                      )}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      {hasFooter ? (
        <tfoot>
          <tr>
            {columns.map((column) => {
              const alignment = column.alignment ?? "center";
              return (
                <td key={`footer--${String(column.key)}`}>
                  <div
                    className={join(
                      "table-cell-footer",
                      `table-cell-footer--alignment-${alignment}`,
                    )}
                  >
                    {column.total ? column.total(rows) : undefined}
                  </div>
                </td>
              );
            })}
          </tr>
        </tfoot>
      ) : undefined}
    </table>
  );
}
