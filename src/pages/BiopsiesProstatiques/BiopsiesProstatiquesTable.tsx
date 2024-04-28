import { Column, Table } from "../../ui/Table";
import { range, sum } from "../../ui/helpers";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellNumberField,
  CellSize,
  CellTextField,
  CellYesNo,
} from "./cells";
import {
  LOCALIZATIONS,
  Localization,
  POT_TYPES,
  Pair,
  PotType,
} from "./constants";

// TODO: make table inputs editable
// TODO: clarify logic to initialize the table

const TableHeader = () => (
  <>
    <tr>
      <th scope="col" rowSpan={2} colSpan={1}>
        N<sup>o</sup>
      </th>
      <th scope="col" rowSpan={2} colSpan={1}>
        Type
      </th>
      <th scope="col" rowSpan={2} colSpan={1}>
        Localisation
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

const byGleasonScore = (a: Pair, b: Pair) =>
  // By sum
  sum(b) - sum(a) ||
  // By left value in case of equality
  b[0] - a[0];

const getMaximumByGleasonScore = (pairs: Pair[]) =>
  pairs.sort(byGleasonScore)[0];

type Row = {
  // TODO: rename the site group
  index: number;
  type: PotType;
  localization: Localization;
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

// TODO: pass value/setter as props
// TODO NOW: extract to a separate cells.tsx file
// TODO NOW: adjust style
// TODO NOW: separate GleasonField vs Gleason, SizeField vs Size

const COLUMNS: Column<Row>[] = [
  {
    label: "Index",
    key: "index",
    render: (_value, rowIndex) => <CellNumber value={rowIndex + 1} />,
  },
  {
    label: "Type",
    key: "type",
    render: (value) => (
      <CellChoice name="Type" options={POT_TYPES} _value={value.type} />
    ),
  },
  {
    label: "Localization",
    key: "localization",
    render: (value) => (
      <CellChoice
        name="Localization"
        options={LOCALIZATIONS}
        _value={value.localization}
      />
    ),
  },
  {
    label: "Biopsy Count",
    key: "biopsy.count",
    render: (row) => <CellNumberField _value={row.biopsy.count} />,
    total: (rows) => <span>{sum(rows.map((row) => row.biopsy.count))}</span>,
  },
  {
    label: "Biopsy Size",
    key: "biopsy.size",
    render: (row) => <CellSize _value={row.biopsy.size} />,
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
    render: (row) => <CellNumberField _value={row.tumor.count} />,
    total: (rows) => <span>{sum(rows.map((row) => row.tumor.count))}</span>,
  },
  {
    label: "Tumor size",
    key: "tumor.size",
    render: (row) => <CellSize _value={row.tumor.size} />,
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
    render: (row) => <CellGleason _value={row.tumor.gleason} />,
    total: (rows) => {
      const pairs = rows.map((row) => row.tumor.gleason);
      const [a, b] = getMaximumByGleasonScore(pairs);

      return (
        <span>
          {a + b} ({a} + {b})
        </span>
      );
    },
  },
  {
    label: "Tumor EPN",
    key: "tumor.epn",
    render: (row) => <CellYesNo name="Tumor EPN" _value={row.tumor.epn} />,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.epn).some(Boolean)}</span>
    ),
  },
  {
    label: "Tumor TEP",
    key: "tumor.tep",
    render: (row) => <CellYesNo name="Tumor TEP" _value={row.tumor.tep} />,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.tep).some(Boolean)}</span>
    ),
  },
  {
    label: "Tumor PIN",
    key: "tumor.pin",
    render: (row) => <CellYesNo name="Tumor PIN" _value={row.tumor.pin} />,
    total: (rows) => (
      <span>{rows.map((row) => row.tumor.pin).some(Boolean)}</span>
    ),
  },
  {
    label: "Other lesions",
    key: "otherLesions",
    render: (row) => {
      return <CellTextField _value={row.otherLesions} />;
    },
  },
];

const anEmptyRow = (index: number): Row => ({
  index,
  type: "sextan",
  localization: "base-right",
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
  return (
    <Table columns={COLUMNS} rows={rows} header={TableHeader} hasFooter />
    // TODO: display validation errors here:
    // - Check target/sextan count
  );
};
