import { Select } from "../../ui/Select";
import { Column, Table } from "../../ui/Table";
import { ValidationErrors } from "../../ui/ValidationErrors";
import { YesOrNo } from "../../ui/YesOrNo";
import { toOption } from "../../ui/helpers/helpers";
import { Option } from "../../ui/helpers/options";
import { SelectLocation } from "./SelectLocation";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellNumberSum,
  CellTextField,
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
export const ProstateBiopsyTable = ({
  rows,
  score,
  errors,
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
      render: (row, onChange) => (
        <CellChoice
          name="Type"
          options={CONTAINER_TYPES}
          value={row.type}
          onChange={onChange}
        />
      ),
    },
    {
      label: "Location",
      key: "location",
      render: (row, onChange) => (
        <SelectLocation value={row.location} onChange={onChange} />
      ),
    },
    {
      label: "Biopsy Count",
      key: "biopsyCount",
      render: (row, onChange) => (
        <Select
          name="Biopsy count"
          value={row.biopsyCount}
          options={BIOPSY_COUNT_OPTIONS}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.biopsyCount}</span>,
    },
    {
      label: "Biopsy Size",
      key: "biopsySize",
      alignment: "left",
      render: (row, onChange) => (
        <CellNumberSum
          value={row.biopsySize}
          inputCount={row.biopsyCount}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.biopsySize}</span>,
    },
    {
      label: "Tumor count",
      key: "tumorCount",
      render: (row, onChange) => (
        <Select
          name="Tumor count"
          value={row.tumorCount}
          options={TUMOR_COUNT_OPTIONS}
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
      render: (row, onChange) => (
        <CellNumberSum
          value={row.tumorSize}
          inputCount={row.tumorCount}
          onChange={onChange}
        />
      ),
      total: (_rows) => <span>{score.tumorSize}</span>,
    },
    {
      label: "Tumor gleason",
      key: "tumorGleason",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, onChange) => (
        <CellGleason value={row.tumorGleason} onChange={onChange} />
      ),
      total: (_rows) => {
        if (!score.tumorGleason) {
          return undefined;
        }

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
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, onChange) => (
        <CellYesNo name="Tumor EPN" value={row.tumorEpn} onChange={onChange} />
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
      render: (row, onChange) => (
        <CellYesNo name="Tumor TEP" value={row.tumorTep} onChange={onChange} />
      ),
      total: (_rows) => {
        if (!score.tumorTep) {
          return undefined;
        }

        return <YesOrNo value={score.tumorTep} />;
      },
    },
    {
      label: "Tumor PIN",
      key: "tumorPin",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, onChange) => (
        <CellYesNo name="Tumor PIN" value={row.tumorPin} onChange={onChange} />
      ),
      total: (_rows) => {
        if (!score.tumorPin) {
          return undefined;
        }

        return <YesOrNo value={score.tumorPin} />;
      },
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      alignment: "left",
      render: (row, onChange) => (
        <CellTextField value={row.otherLesions} onChange={onChange} />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={COLUMNS}
        rows={rows}
        header={TableHeader}
        hasFooter
        onChange={_onChange}
      />
      <ValidationErrors errors={errors} />
    </>
  );
};
