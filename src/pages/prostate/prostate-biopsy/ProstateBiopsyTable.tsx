import { Select } from "../../../ui/Select";
import { Column, Table } from "../../../ui/Table";
import { YesOrNo } from "../../../ui/YesOrNo";
import { noop, toOption } from "../../../ui/helpers/helpers";
import { Option } from "../../../ui/helpers/options";
import { Language, translate } from "../../../ui/language";
import { SelectLocation } from "./SelectLocation";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellSize,
  CellSelectList,
  CellYesNo,
} from "./cells";
import {
  ProstateBiopsyFormId,
  RowWithMetadata,
  Score,
  getContainerTypes,
} from "./helpers";

const BIOPSY_COUNT_OPTIONS: Option<number>[] = [1, 2, 3, 4].map(toOption);
const TUMOR_COUNT_OPTIONS: Option<number>[] = [0, 1, 2, 3, 4].map(toOption);

const TableHeader = ({ language }: { language: Language }) => (
  <>
    <tr>
      <th scope="col" rowSpan={1} colSpan={3}>
        {translate("Pots", language)}
      </th>
      <th scope="col" rowSpan={1} colSpan={2}>
        {translate("Biopsies", language)}
      </th>
      <th scope="col" rowSpan={1} colSpan={5}>
        {translate("Tumeurs", language)}
      </th>
      <th scope="col" rowSpan={2} colSpan={2}>
        {translate("Autres lésions", language)}
      </th>
    </tr>
    <tr>
      <th scope="col">{translate("Numéro", language)}</th>
      <th scope="col">{translate("Type", language)}</th>
      <th scope="col">{translate("Localisation", language)}</th>
      <th scope="col">{translate("Nombre", language)}</th>
      <th scope="col">{translate("Taille", language)}</th>
      <th scope="col">{translate("Nombre", language)} +</th>
      <th scope="col">{translate("Taille", language)} *</th>
      <th scope="col">{translate("Score de Gleason", language)}</th>
      <th scope="col">{translate("EPN", language)}</th>
      <th scope="col">{translate("TEP", language)}</th>
    </tr>
  </>
);

type Props = {
  formId: ProstateBiopsyFormId;
  language: Language;
  visibleRowCount: number,
  rows: RowWithMetadata[];
  score: Score;
  isReadOnly?: boolean;
  onChange: (rows: RowWithMetadata[]) => void;
};

export const ProstateBiopsyTable = ({
  formId,
  language,
  visibleRowCount,
  rows,
  score,
  isReadOnly,
  onChange: _onChange,
}: Props) => {
  const COLUMNS: Column<RowWithMetadata>[] = [
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
          language={language}
          name="Type"
          value={row.type}
          options={getContainerTypes(formId)}
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
          formId={formId}
          language={language}
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
          language={language}
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
        <CellSize
          value={row.biopsySize}
          inputCount={row.biopsySizeInputCount}
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
          language={language}
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
        <CellSize
          value={row.tumorSize}
          inputCount={row.tumorSizeInputCount}
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
          language={language}
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
          <CellGleason
            language={language}
            value={score.tumorGleason}
            isReadOnly
            onChange={noop}
          />
        );
      },
    },
    {
      label: "Tumor EPN",
      key: "tumorEpn",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellYesNo
          language={language}
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

        return <YesOrNo language={language} value={score.tumorEpn} />;
      },
    },
    {
      label: "Tumor TEP",
      key: "tumorTep",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellYesNo
          language={language}
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

        return <YesOrNo language={language} value={score.tumorTep} />;
      },
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      alignment: "left",
      render: (row, isReadOnly, onChange) => (
        <CellSelectList
          language={language}
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
      visibleRowCount={visibleRowCount}
      rows={rows}
      header={() => <TableHeader language={language} />}
      hasFooter
      isReadOnly={isReadOnly}
      onChange={_onChange}
    />
  );
};
