import {
  Column,
  Language,
  Option,
  Select,
  Table,
  noop,
  reportBoolean,
  toOption,
  translate,
} from "../../../ui";
import { SelectLocation } from "./SelectLocation";
import {
  CellChoice,
  CellGleason,
  CellNumber,
  CellSelectList,
  CellSize,
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

const TableHeader = ({ language }: { language: Language }) => {
  const t = (value: string) => translate(value, language);

  return (
    <>
      <tr>
        <th scope="col" rowSpan={1} colSpan={3}>
          {t("Pots")}
        </th>
        <th scope="col" rowSpan={1} colSpan={2}>
          {t("Biopsies")}
        </th>
        <th scope="col" rowSpan={1} colSpan={5}>
          {t("Tumeurs")}
        </th>
        {/* FIXME: fix column width to avoid jumping tooltip */}
        <th scope="col" rowSpan={2} colSpan={2}>
          {t("Autres lésions")}
        </th>
      </tr>
      <tr>
        <th scope="col">{t("Numéro")}</th>
        <th scope="col">{t("Type")}</th>
        <th scope="col">{t("Localisation")}</th>
        <th scope="col">{t("Nombre")}</th>
        <th scope="col">{t("Taille")}</th>
        <th scope="col">{t("Nombre")} +</th>
        <th scope="col">{t("Taille")} *</th>
        <th scope="col">{t("Score de Gleason")}</th>
        <th scope="col">{t("EPN")}</th>
        <th scope="col">{t("TEP")}</th>
      </tr>
    </>
  );
};

type Props = {
  formId: ProstateBiopsyFormId;
  language: Language;
  visibleRowCount: number;
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
          values={row.biopsySize}
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
          values={row.tumorSize}
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
          value={row.tumorEpn}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => {
        if (!score.tumorEpn) {
          return undefined;
        }

        return reportBoolean({ value: score.tumorEpn, language });
      },
    },
    {
      label: "Tumor TEP",
      key: "tumorTep",
      isDisabled: (row) => row.tumorCount === 0,
      render: (row, isReadOnly, onChange) => (
        <CellYesNo
          language={language}
          value={row.tumorTep}
          isReadOnly={isReadOnly}
          onChange={onChange}
        />
      ),
      total: (_rows) => {
        if (!score.tumorTep) {
          return undefined;
        }

        return reportBoolean({ value: score.tumorTep, language });
      },
    },
    {
      label: "Other lesions",
      key: "otherLesions",
      alignment: "left",
      render: (row, isReadOnly, onChange) => (
        <CellSelectList
          language={language}
          values={row.otherLesions}
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
