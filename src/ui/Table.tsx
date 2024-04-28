import "./table.css";

export type ValueOf<Row> = Row[keyof Row];

// TODO: fix with a mapped type after re-reading Gabriel's Typescript course
export type Column<Row> = {
  label: string;
  key: string;
  render: (row: Row, rowIndex: number) => JSX.Element;
  total?: (rows: Row[]) => JSX.Element;
};

type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  header?: () => JSX.Element;
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
            {columns.map((column) => (
              <td key={`cell--${String(column.key)}--${rowIndex}`}>
                <div className="table-cell">{column.render(row, rowIndex)}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {hasFooter ? (
        <tfoot>
          {columns.map((column) => {
            return (
              <th key={`footer--${String(column.key)}`}>
                {column.total ? column.total(rows) : undefined}
              </th>
            );
          })}
        </tfoot>
      ) : undefined}
    </table>
  );
}
