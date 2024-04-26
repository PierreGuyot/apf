import { Column, Table } from "../../ui/Table";
import { range, sum } from "../../ui/helpers";

// TODO: make table inputs editable
// TODO: clarify logic to initialize the table

const TableHeader = () => (
  <>
    <tr>
      <th scope="col" rowSpan={2} colSpan={3}>
        Sites
      </th>
      <th scope="col" rowSpan={1} colSpan={2}>
        Biopsies
      </th>
      <th scope="col" rowSpan={1} colSpan={6}>
        Tumeur
      </th>
      <th scope="col" rowSpan={2} colSpan={2}>
        Autres lésions
      </th>
    </tr>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Taille</th>
      <th scope="col">Nombre +</th>
      <th scope="col">Taille</th>
      <th scope="col">Gleason</th>
      <th scope="col">EPN</th>
      <th scope="col">TEP</th>
      <th scope="col">PIN</th>
    </tr>
  </>
);

type Pair = [number, number];

type Row = {
  // TODO: rename the site group
  sites: {
    1: string;
    2: string;
    3: string;
  };

  biopsy: {
    count: number;
    size: Pair;
  };
  tumor: {
    count: number;
    size: Pair;
    gleason: Pair;
    epn: boolean;
    tep: boolean;
    pin: boolean;
  };
  otherLesions: string;
};

const COLUMNS: Column<Row>[] = [
  {
    label: "Site 1",
    key: "site.1",
    render: (value) => <span>{value.sites[1]}</span>,
  },
  {
    label: "Site 2",
    key: "site.2",
    render: (value) => <span>{value.sites[2]}</span>,
  },
  {
    label: "Site 3",
    key: "site.3",
    render: (value) => <span>{value.sites[3]}</span>,
  },
  {
    label: "Biopsy Count",
    key: "biopsy.count",
    render: (row) => <span>{row.biopsy.count}</span>,
    total: (rows) => <span>{sum(rows.map((row) => row.biopsy.count))}</span>,
  },
  {
    label: "Biopsy Size",
    key: "biopsy.size",
    render: (row) => {
      const [a, b] = row.biopsy.size;
      return (
        <span>
          {a} + {b}
        </span>
      );
    },
    total: (rows) => (
      <span>
        {sum(
          rows.map((row) => {
            const [a, b] = row.biopsy.size;
            return a + b;
          }),
        )}
      </span>
    ),
  },
  {
    label: "Tumor count",
    key: "tumor.count",
    render: (row) => <span>{row.tumor.count}</span>,
    total: (rows) => <span>{sum(rows.map((row) => row.tumor.count))}</span>,
  },
  {
    label: "Tumor size",
    key: "tumor.size",
    render: (row) => {
      const [a, b] = row.tumor.size;
      return (
        <span>
          {a} + {b}
        </span>
      );
    },
    total: (rows) => (
      <span>
        {sum(
          rows.map((row) => {
            const [a, b] = row.tumor.size;
            return a + b;
          }),
        )}
      </span>
    ),
  },
  {
    label: "Tumor gleason",
    key: "tumor.gleason",
    render: (row) => {
      const [a, b] = row.tumor.gleason;
      return (
        <span>
          {a + b} ({a} + {b})
        </span>
      );
    },
    total: (_rows) => {
      return <span>TODO</span>;
    },
  },
  {
    label: "Tumor EPN",
    key: "tumor.epn",
    render: (row) => <span>{row.tumor.epn ? "Oui" : "Non"}</span>,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.epn).some(Boolean)}</span>
    ),
  },
  {
    label: "Tumor TEP",
    key: "tumor.tep",
    render: (row) => <span>{row.tumor.tep ? "Oui" : "Non"}</span>,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.tep).some(Boolean)}</span>
    ),
  },
  {
    label: "Tumor PIN",
    key: "tumor.pin",
    render: (row) => <span>{row.tumor.pin ? "Oui" : "Non"}</span>,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.pin).some(Boolean)}</span>
    ),
  },
  {
    label: "Other lesions",
    key: "otherLesions",
    render: (row) => <span>{row.otherLesions ? "Oui" : "Non"}</span>,
  },
];

const anEmptyRow = (): Row => ({
  sites: { 1: "TODO", 2: "TODO", 3: "TODO" },
  biopsy: { count: 2, size: [0, 0] },
  tumor: {
    count: 0,
    size: [0, 0],
    gleason: [0, 0],
    epn: false,
    tep: false,
    pin: false,
  },
  otherLesions: "",
});
const rows = range(6).map(anEmptyRow);

export const BiopsiesProstatiquesTable = () => {
  return <Table columns={COLUMNS} rows={rows} header={TableHeader} hasFooter />;
};
