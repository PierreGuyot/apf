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
};

export function Table<Row>({ columns, rows, header: Header }: TableProps<Row>) {
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
                {column.render(row, rowIndex)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
