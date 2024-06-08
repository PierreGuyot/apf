import { ReactNode } from "react";
import { join, patchArray } from "./helpers/helpers";
import "./table.css";

export type ValueOf<Row> = Row[keyof Row];

type Alignment = "left" | "center";

type BaseColumn<Key, Value, Row> = {
  label: string;
  key: Key;
  alignment?: Alignment; // 'center' by default
  isDisabled?: (row: Row) => boolean;
  render: (
    row: Row,
    isReadOnly: boolean,
    onChange: (value: Value) => void,
  ) => ReactNode;
  total?: (rows: Row[]) => ReactNode;
};
type DistributeColumns<Base, K extends keyof Base> = K extends unknown
  ? BaseColumn<K, Base[K], Base>
  : never;

export type Column<Row> = DistributeColumns<Row, keyof Row>;

type Props<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  header?: () => ReactNode;
  hasFooter?: boolean;
  isReadOnly?: boolean;
  onChange: (rows: Row[]) => void;
};

export function Table<Row>({
  columns,
  rows,
  header: Header,
  hasFooter,
  isReadOnly = false,
  onChange,
}: Props<Row>) {
  return (
    <>
      <table>
        {/* Header */}
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

        {/* Body */}
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
                        {column.render(row, isReadOnly, (value) =>
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

        {/* Footer  */}
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
    </>
  );
}
