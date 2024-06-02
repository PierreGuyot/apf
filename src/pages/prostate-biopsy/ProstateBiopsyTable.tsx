import { Select } from "../../ui/Select";
import { Column, Table } from "../../ui/Table";
import { YesOrNo } from "../../ui/YesOrNo";
import { noop, toOption } from "../../ui/helpers/helpers";
import { Option } from "../../ui/helpers/options";
import { SelectLocation } from "./SelectLocation";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellNumberSum,
  CellSelectList,
  CellYesNo,
} from "./cells";
import { CONTAINER_TYPES, Row, Score } from "./helpers";

const BIOPSY_COUNT_OPTIONS: Option<number>[] = [1, 2, 3, 4].map(toOption);
const TUMOR_COUNT_OPTIONS: Option<number>[] = [0, 1, 2, 3, 4].map(toOption);

const TableHeader = () => (
  <>
    <tr>
      <th scope="col" rowSpan={1} colSpan={3}>
        Pots
      </th>
      <th scope="col" rowSpan={1} colSpan={2}>
        Biopsies
      </th>
      <th scope="col" rowSpan={1} colSpan={5}>
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
    </tr>
  </>
);

type Props = {
  rows: Row[];
  score: Score;
  onChange: (rows: Row[]) => void;
};

export const ProstateBiopsyTable = ({
  rows,
  score,
  onChange: _onChange,
}: Props) => {
  // TODO clean: consider passing score directly as an object to Table

  const COLUMNS: Column<Row>[] = [
    {
      label: "Index",
      key: "index",
      render: (row) => <CellNumber value={row.index + 1} />,
    },
    {
      label: "Type",
      key: "type",
      render: (row, isReadOnly, onChange) => (
        <CellChoice
          name="Type"
          value={row.type}
          options={CONTAINER_TYPES}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
    },
    {
      label: "Location",
      key: "location",
      render: (row, isReadOnly, onChange) => (
        <SelectLocation
          value={row.location}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
    },
    {
      label: "Biopsy Count",
      key: "biopsyCount",
      render: (row, isReadOnly, onChange) => (
        <Select
          name="Biopsy count"
          value={row.biopsyCount}
          options={BIOPSY_COUNT_OPTIONS}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.biopsyCount}</span>,
    },
    {
      label: "Biopsy Size",
      key: "biopsySize",
      alignment: "left",
      render: (row, isReadOnly, onChange) => (
        <CellNumberSum
          value={row.biopsySize}
          inputCount={row.biopsyCount}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.biopsySize}</span>,
    },
    {
      label: "Tumor count",
      key: "tumorCount",
      render: (row, isReadOnly, onChange) => (
        <Select
          name="Tumor count"
          value={row.tumorCount}
          options={TUMOR_COUNT_OPTIONS}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.tumorCount}</span>,
    },
    {
      label: "Tumor size",
      key: "tumorSize",
      alignment: "left",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellNumberSum
          value={row.tumorSize}
          inputCount={row.tumorCount}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.tumorSize}</span>,
    },
    {
      label: "Tumor gleason",
      key: "tumorGleason",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellGleason
          value={row.tumorGleason}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => {
        if (!score.tumorGleason) {
          return undefined;
        }

        return (
          <CellGleason value={score.tumorGleason} isReadOnly onChange={noop} />
        );
      },
    },
    {
      label: "Tumor EPN",
      key: "tumorEpn",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellYesNo
          name="Tumor EPN"
          value={row.tumorEpn}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => {
        if (!score.tumorEpn) {
          return undefined;
        }

        return <YesOrNo value={score.tumorEpn} />;
      },
    },
    {
      label: "Tumor TEP",
      key: "tumorTep",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellYesNo
          name="Tumor TEP"
          value={row.tumorTep}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => {
        if (!score.tumorTep) {
          return undefined;
        }

        return <YesOrNo value={score.tumorTep} />;
      },
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      alignment: "left",
      render: (row, isReadOnly, onChange) => (
        <CellSelectList
          value={row.otherLesions}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
    },
  ];

  return (
    <Table
      columns={COLUMNS}
      rows={rows}
      header={TableHeader}
      hasFooter
      onChange={_onChange}
    />
  );
};
