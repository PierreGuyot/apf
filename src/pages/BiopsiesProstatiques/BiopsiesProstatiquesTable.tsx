import { Column, Table } from "../../ui/Table";
import { patchArray } from "../../ui/helpers";
import { YES_NO_OPTIONS } from "../../ui/options";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellNumberField,
  CellSize,
  CellTextField,
  CellYesNo,
} from "./cells";
import { LOCATIONS, POT_TYPES, Row, Score } from "./helpers";

// TODO: extract as a helper
const YesOrNo = ({ value }: { value: boolean }) => {
  const option = YES_NO_OPTIONS.find((item) => item.value === value);
  return <span>{option?.label}</span>;
};

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

type Props = {
  rows: Row[];
  score: Score;
  onChange: (rows: Row[]) => void;
};

export const BiopsiesProstatiquesTable = ({ rows, score, onChange }: Props) => {
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
          options={POT_TYPES}
          value={value.type}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({ ...row, type: value })),
            )
          }
        />
      ),
    },
    {
      label: "Location",
      key: "location",
      render: (value, rowIndex) => (
        <CellChoice
          name="Location"
          options={LOCATIONS}
          value={value.location}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                location: value,
              })),
            )
          }
        />
      ),
    },
    {
      label: "Biopsy Count",
      key: "biopsy.count",
      render: (row, rowIndex) => (
        <CellNumberField
          value={row.biopsyCount}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                biopsyCount: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <span>{score.biopsyCount}</span>,
    },
    {
      label: "Biopsy Size",
      key: "biopsy.size",
      render: (row, rowIndex) => (
        <CellSize
          value={row.biopsySize}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                biopsySize: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <span>{score.biopsySize}</span>,
    },
    {
      label: "Tumor count",
      key: "tumor.count",
      render: (row, rowIndex) => (
        <CellNumberField
          value={row.tumorCount}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorCount: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <span>{score.tumorCount}</span>,
    },
    {
      label: "Tumor size",
      key: "tumor.size",
      render: (row, rowIndex) => (
        <CellSize
          value={row.tumorSize}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorSize: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <span>{score.tumorSize}</span>,
    },
    {
      label: "Tumor gleason",
      key: "tumor.gleason",
      render: (row, rowIndex) => (
        <CellGleason
          value={row.tumorGleason}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorGleason: value,
              })),
            )
          }
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
      key: "tumor.epn",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor EPN"
          value={row.tumorEpn}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorEpn: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorEpn} />,
    },
    {
      label: "Tumor TEP",
      key: "tumor.tep",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor TEP"
          value={row.tumorTep}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorTep: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorTep} />,
    },
    {
      label: "Tumor PIN",
      key: "tumor.pin",
      render: (row, rowIndex) => (
        <CellYesNo
          name="Tumor PIN"
          value={row.tumorPin}
          onChange={(value) =>
            onChange(
              patchArray(rows, rowIndex, (row) => ({
                ...row,
                tumorPin: value,
              })),
            )
          }
        />
      ),
      total: (_rows) => <YesOrNo value={score.tumorPin} />,
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      render: (row, rowIndex) => {
        return (
          <CellTextField
            value={row.otherLesions}
            onChange={(value) =>
              onChange(
                patchArray(rows, rowIndex, (row) => ({
                  ...row,
                  otherLesions: value,
                })),
              )
            }
          />
        );
      },
    },
  ];

  return (
    <Table columns={COLUMNS} rows={rows} header={TableHeader} hasFooter />
    // TODO: display validation errors here:
    // - Check target/sextan count
  );
};
