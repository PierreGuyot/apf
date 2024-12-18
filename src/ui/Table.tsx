import { ReactNode } from "react";
import { join, patchArray } from "./helpers/helpers";
import css from "./table.module.css";

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
    index: number,
    // TODO clean: make arguments named
    // TODO clean: consider passing error instead of having to use errors[index]
  ) => ReactNode;
  total?: (rows: Row[]) => ReactNode;
};
type DistributeColumns<Base, K extends keyof Base> = K extends unknown
  ? BaseColumn<K, Base[K], Base>
  : never;

export type Column<Row> = DistributeColumns<Row, keyof Row>;

type Props<Row> = {
  columns: Column<Row>[];
  visibleRowCount?: number;
  rows: Row[];
  header?: () => ReactNode;
  hasFooter?: boolean;
  isReadOnly?: boolean;
  onChange: (rows: Row[]) => void;
};

export function Table<Row>({
  columns,
  visibleRowCount,
  rows,
  header: Header,
  hasFooter,
  isReadOnly = false,
  onChange,
}: Props<Row>) {
  return (
    <>
      <table className={css.main}>
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
          {rows.slice(0, visibleRowCount).map((row, rowIndex) => (
            <tr key={`row--${rowIndex}`}>
              {columns.map((column) => {
                const isDisabled = column.isDisabled && column.isDisabled(row);
                const alignment = column.alignment ?? "center";

                return (
                  <td
                    key={`cell--${String(column.key)}--${rowIndex}`}
                    className={join(
                      isDisabled ? css["cell--is-disabled"] : undefined,
                    )}
                  >
                    {isDisabled ? undefined : (
                      <div
                        className={join(css.cell, css[`cell--${alignment}`])}
                      >
                        {column.render(
                          row,
                          isReadOnly,
                          (value) =>
                            onChange(
                              patchArray(rows, rowIndex, (row) => ({
                                ...row,
                                [column.key]: value,
                              })),
                            ),
                          rowIndex,
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
                      className={join(css.footer, css[`footer--${alignment}`])}
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
