export type ValueOf<Row> = Row[keyof Row];

// TODO: fix with a mapped type after re-reading Gabriel's Typescript course
export type Column<Row> = {
  label: string;
  key: keyof Row;
  render: (value: ValueOf<Row>, rowIndex: number) => JSX.Element;
  total?: (values: number[]) => JSX.Element;
};

type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  hasFooter?: boolean;
};

const EMPTY_STATE = <span>N/A</span>

export function Table<Row>({ columns, rows, hasFooter }: TableProps<Row>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={`header--${String(column.key)}`}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row--${rowIndex}`}>
            {columns.map((column) => (
              <td key={`cell--${String(column.key)}--${rowIndex}`}>
                {column.render(row[column.key], rowIndex)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {hasFooter ? (
        <tfoot>
          {columns.map((column) => {
            const values = rows.map((row) => row[column.key]);
            return (
              <th key={`footer--${String(column.key)}`}>
                {/* TODO: fix with a mapped type after re-reading Gabriel's Typescript course */}
                {column.total ? column.total(values as number[]) : EMPTY_STATE}
              </th>
            );
          })}
        </tfoot>
      ) : undefined}
    </table>
  );
}
