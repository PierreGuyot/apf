import { Column, Table, ValueOf } from "../../ui/Table";
import { YesOrNo } from "../../ui/YesOrNo";
import { patchArray } from "../../ui/helpers";
import { SelectLocation } from "./SelectLocation";
import { ValidationErrors } from "./ValidationErrors";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellNumberField,
  CellSize,
  CellTextField,
  CellYesNo,
  SelectBiopsyCount,
} from "./cells";
import { CONTAINER_TYPES, Row, Score } from "./helpers";

const TableHeader = () => (
  <>
    <tr>
      <th scope="col" rowSpan={1} colSpan={3}>
        Pots
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
      <th scope="col">
        N<sup>o</sup>
      </th>
      <th scope="col">Type</th>
      <th scope="col">Localisation</th>
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

type Props = {
  rows: Row[];
  score: Score;
  errors: string[];
  onChange: (rows: Row[]) => void;
};

// TODO clean: spread in parent
export const BiopsiesProstatiquesTable = ({
  rows,
  score,
  errors,
  onChange,
}: Props) => {
  // TODO clean: consider passing score directly as an object to Table
  // TODO clean: move this wrapper down in Table
  const getOnChange =
    (key: keyof Row, rowIndex: number) => (value: ValueOf<Row>) => {
      onChange(patchArray(rows, rowIndex, (row) => ({ ...row, [key]: value })));
    };

  // TODO: disable tumor related cells when tumor count is zero
  const COLUMNS: Column<Row>[] = [
    {
      label: "Index",
      key: "index",
      render: (_value, rowIndex) => <CellNumber value={rowIndex + 1} />,
    },
    {
      label: "Type",
      key: "type",
      render: (value, rowIndex) => (
        <CellChoice
          name="Type"
          options={CONTAINER_TYPES}
          value={value.type}
          onChange={getOnChange("type", rowIndex)}
        />
      ),
    },
    {
      label: "Location",
      key: "location",
      render: (value, rowIndex) => (
        <SelectLocation
          value={value.location}
          onChange={getOnChange("location", rowIndex)}
        />
      ),
    },
    {
      label: "Biopsy Count",
      key: "biopsyCount",
      render: (row, rowIndex) => (
        <SelectBiopsyCount
          value={row.biopsyCount}
          onChange={getOnChange("biopsyCount", rowIndex)}
        />
      ),
      total: (_rows) => <span>{score.biopsyCount}</span>,
    },
    {
      label: "Biopsy Size",
      key: "biopsySize",
      render: (row, rowIndex) => (
        <CellSize
          value={row.biopsySize}
          onChange={getOnChange("biopsySize", rowIndex)}
        />
      ),
      total: (_rows) => <span>{score.biopsySize}</span>,
    },
    {
      label: "Tumor count",
      key: "tumorCount",
      render: (row, rowIndex) => (
        <CellNumberField
          value={row.tumorCount}
          onChange={getOnChange("tumorCount", rowIndex)}
        />
      ),
      total: (_rows) => <span>{score.tumorCount}</span>,
    },
    {
      label: "Tumor size",
      key: "tumorSize",
      render: (row, rowIndex) => (
        <CellSize
          value={row.tumorSize}
          onChange={getOnChange("tumorSize", rowIndex)}
        />
      ),
      total: (_rows) => <span>{score.tumorSize}</span>,
    },
    {
      label: "Tumor gleason",
      key: "tumorGleason",
      render: (row, rowIndex) => (
        <CellGleason
          value={row.tumorGleason}
          onChange={getOnChange("tumorGleason", rowIndex)}
        />
      ),
      total: (_rows) => {
        const [a, b] = score.tumorGleason;
        return (
          <span>
            {a + b} ({a} + {b})
          </span>
        );
      },
    },
    {
      label: "Tumor EPN",
      key: "tumorEpn",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor EPN"
          value={row.tumorEpn}
          onChange={getOnChange("tumorEpn", rowIndex)}
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorEpn} />,
    },
    {
      label: "Tumor TEP",
      key: "tumorTep",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor TEP"
          value={row.tumorTep}
          onChange={getOnChange("tumorTep", rowIndex)}
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorTep} />,
    },
    {
      label: "Tumor PIN",
      key: "tumorPin",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor PIN"
          value={row.tumorPin}
          onChange={getOnChange("tumorPin", rowIndex)}
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorPin} />,
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      render: (row, rowIndex) => (
        <CellTextField
          value={row.otherLesions}
          onChange={getOnChange("otherLesions", rowIndex)}
        />
      ),
    },
  ];

  return (
    <>
      <Table columns={COLUMNS} rows={rows} header={TableHeader} hasFooter />
      <ValidationErrors errors={errors} />
    </>
  );
};
