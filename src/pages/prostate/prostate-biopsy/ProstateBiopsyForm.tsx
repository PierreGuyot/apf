import { useMemo } from "react";
import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { FormPage } from "../../../common/FormPage";
import {
  IhcState,
  Immunohistochemistry,
} from "../../../common/immunohistochemistry/Immunohistochemistry";
import { InputNumber } from "../../../ui/InputNumber";
import { Item } from "../../../ui/Item";
import { Line } from "../../../ui/Line";
import { NestedItem } from "../../../ui/NestedItem";
import { Section } from "../../../ui/Section";
import { Select } from "../../../ui/Select";
import { SelectNumber } from "../../../ui/SelectNumber";
import { Summary } from "../../../ui/Summary";
import { ValidationErrors } from "../../../ui/ValidationErrors";
import { useForm } from "../../../ui/helpers/form-state";
import {
  filterNullish,
  noop,
  range,
  sum,
  sumArrays,
  toOption,
} from "../../../ui/helpers/helpers";
import { Option, YES_NO_OPTIONS } from "../../../ui/helpers/options";
import { count } from "../../../ui/helpers/plural";
import { isDebug } from "../../../ui/helpers/state";
import { naturalJoin } from "../../../ui/helpers/text";
import { DEFAULT_LANGUAGE } from "../../../ui/language";
import {
  PROSTATE_ANTIBODY_GROUPS,
  PROSTATE_ANTIBODY_PROPERTIES,
  TUMOR_TYPES,
  TumorType,
  getTumorTypeOption,
} from "../helpers";
import { PiradsSelect } from "./PiradsSelect";
import { ProstateBiopsyTable } from "./ProstateBiopsyTable";
import {
  LOCATIONS,
  MAX_CONTAINER_COUNT,
  MAX_TARGET_COUNT,
  PiradsItem,
  ProstateBiopsyFormId,
  Row,
  SEXTANT_COUNT,
  Score,
  anEmptyPiradsItem,
  anEmptyRow,
  getMaximumByGleasonScore,
} from "./helpers";
import { generateReport } from "./report";

const CONTAINER_COUNT = [6, 7, 8, 9] as const;
const CONTAINER_COUNT_OPTIONS: Option<number>[] = CONTAINER_COUNT.map(toOption);

// TODO clean: test extensively
// CAUTION: be very cautious about counting only visible items
const getScore = (rows: Row[]): Score => {
  // CAUTION: only count non-disabled rows (i.e. the ones with a tumorCount)
  const rowsWithTumor = rows.filter((row) => row.tumorCount);
  const tumorCount = sum(rows.map((row) => row.tumorCount));
  const tumorScore = tumorCount
    ? {
        tumorSize: sumArrays(rowsWithTumor.map((row) => row.tumorSize)),
        tumorGleason: getMaximumByGleasonScore(
          rowsWithTumor.map((row) => row.tumorGleason),
        ),
        tumorEpn: rowsWithTumor.map((row) => row.tumorEpn).some(Boolean),
        tumorTep: rowsWithTumor.map((row) => row.tumorTep).some(Boolean),
      }
    : {};

  return {
    biopsyCount: sum(rows.map((row) => row.biopsyCount)),
    // CAUTION: only count visible inputs for size (not the hidden ones)
    biopsySize: sumArrays(
      rows.map((row) => row.biopsySize.slice(0, row.biopsyCount)),
    ),
    tumorCount,
    ...tumorScore,
  };
};

// CAUTION: only count visible inputs for size (not the hidden ones)
const hasValidSizes = (row: Row) => {
  const biopsySizes = row.biopsySize.slice(0, row.biopsyCount);
  const tumorSizes = row.tumorSize.slice(0, row.tumorCount);
  return [...biopsySizes, ...tumorSizes].every((size) => size > 0);
};

// FIXME: add validations for IHC:
//  - If there is an IHC, there must be at least one antibody in the least
//  - In an antibody block, there must be at least one selected block
// TODO clean: test extensively
const getErrors = ({
  sextantName,
  rows,
  containerCount,
  piradsItems,
  tumorType,
}: {
  sextantName: string;
  rows: Row[];
  containerCount: number;
  piradsItems: PiradsItem[];
  tumorType: TumorType;
}) => {
  const errors: string[] = [];

  const sextants = rows.filter((row) => row.type === "sextant");
  const sextantCount = sextants.length;
  const targets = rows.filter((row) => row.type === "target");
  const targetCount = targets.length;
  const expectedTargetCount = containerCount - SEXTANT_COUNT;

  // List of locations

  if (targetCount !== expectedTargetCount) {
    errors.push(
      `Le tableau devrait contenir ${count(expectedTargetCount, "cible")} et non ${targetCount}.`,
    );
    errors.push(
      `Le tableau devrait contenir ${count(SEXTANT_COUNT, sextantName)} et non ${sextantCount}.`,
    );
  }

  const locations = new Set(sextants.map((sextant) => sextant.location));
  if (locations.size !== SEXTANT_COUNT) {
    errors.push(
      `Le tableau devrait contenir un et un seul sextant à chacune des six positions.`,
    );
  }

  // Biopsy count

  rows.forEach((row, index) => {
    if (row.tumorCount > row.biopsyCount) {
      errors.push(
        `Le nombre de biopsies présentant une tumeur pour le pot numéro ${index + 1} est plus grand que le nombre de biopsies.`,
      );
    }
  });

  // Sizes

  const rowNumbersWithInvalidSizes = rows
    .map((row, index) => (hasValidSizes(row) ? undefined : index + 1))
    .filter(filterNullish);
  if (rowNumbersWithInvalidSizes.length) {
    errors.push(
      `Certaines tailles sont égales à 0 (pots numéros ${naturalJoin(rowNumbersWithInvalidSizes, DEFAULT_LANGUAGE)}).`,
    );
  }

  // PIRADS

  // There can be more targets in the table than PIRADS items
  // But the PIRADS items must match the targets declared in the table
  const tableTargets = new Set(
    rows.filter((row) => row.type === "target").map((item) => item.location),
  );
  piradsItems.forEach((item, index) => {
    const match = tableTargets.has(item.location);
    if (!match) {
      errors.push(
        `La position du PIRADS numéro ${index + 1} ne correspond pas à aucune cible indiquée dans le tableau.`,
      );
    }
  });

  // Gleason score

  const tumorTypeOption = getTumorTypeOption(tumorType);
  const targetScore = tumorTypeOption.score;
  if (targetScore) {
    const matchingScore = rows.find(
      (row) =>
        row.tumorGleason.a === targetScore ||
        row.tumorGleason.b === targetScore,
    );
    if (!matchingScore) {
      errors.push(
        `Il n'y a aucun score de Gleason dans le tableau qui corresponde à une tumeur de type histologique ${tumorTypeOption.label}.`,
      );
    }
  }

  return errors;
};

export type FormState = {
  hasInfo: boolean;
  hasTarget: boolean;
  targetCount: number;
  hasMri: boolean;
  psaRate: number;
  containerCount: number;
  piradsItems: PiradsItem[];
  rows: Row[];
  tumorType: TumorType;
  ihc: IhcState;
  comment: string;
};

const getPiradsItems = () => range(MAX_TARGET_COUNT).map(anEmptyPiradsItem);

const getRows = () => [
  // 6 sextants (each for one location)
  ...LOCATIONS.map((location, index) =>
    anEmptyRow({ index, location, type: "sextant" }),
  ),
  // 3 targets
  ...range(MAX_TARGET_COUNT).map((_, index) =>
    anEmptyRow({ index: index + LOCATIONS.length, type: "target" }),
  ),
];

const getInitialState = (): FormState => ({
  hasInfo: isDebug,
  hasTarget: isDebug,
  targetCount: 0,
  hasMri: isDebug,
  psaRate: 0,
  containerCount: MAX_CONTAINER_COUNT,
  piradsItems: getPiradsItems(),
  rows: getRows(),
  tumorType: "acinar-adenocarcinoma-conventional",
  ihc: {
    hasIhc: true,
    antibodies: [],
  },
  comment: "",
});

type Props = {
  formId: ProstateBiopsyFormId;
};

export const ProstateBiopsyForm = ({ formId }: Props) => {
  const sextantName =
    formId === "prostate-biopsy-transrectal"
      ? "sextant"
      : "biopsie systématique";

  // State
  const { state, setField, clearState } = useForm(getInitialState);
  const {
    hasInfo,
    hasTarget,
    targetCount,
    hasMri,
    psaRate,
    containerCount,
    tumorType,
    ihc,
    comment,
  } = state;

  // For rows and piradsItems, we handle the maximum number of items in all
  // cases and simply hide according to count.
  // This way, changing the count doesn't erase previous user input.
  const rows = useMemo(
    () => state.rows.slice(0, state.containerCount),
    [state.rows, state.containerCount],
  );
  const piradsItems = useMemo(
    () => state.piradsItems.slice(0, state.targetCount),
    [state.piradsItems, state.targetCount],
  );

  // Computed

  const score = getScore(rows);
  const errors = getErrors({
    sextantName,
    rows,
    containerCount: state.containerCount,
    piradsItems,
    tumorType,
  });

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [...state.piradsItems];
    updatedArray[index] = value;
    setField("piradsItems")(updatedArray);
  };

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Section title="Renseignements cliniques" index={1}>
        <Line>
          <Select
            value={hasInfo}
            options={YES_NO_OPTIONS}
            name="Renseignements cliniques"
            label="Avez-vous des renseignements cliniques ?"
            onChange={setField("hasInfo")}
          />
        </Line>
        {hasInfo ? (
          <>
            <Line>
              <InputNumber
                value={psaRate}
                label="Taux de PSA"
                unit="ng-per-mL"
                size="lg"
                isDecimal
                onChange={setField("psaRate")}
              />
            </Line>
            <Line>
              <Select
                value={hasMri}
                options={YES_NO_OPTIONS}
                name="IRM"
                label="Avez-vous une IRM ?"
                onChange={setField("hasMri")}
              />
            </Line>
            {hasMri ? (
              <>
                <Line>
                  <Select
                    value={hasTarget}
                    options={YES_NO_OPTIONS}
                    name="Présence de cible"
                    label="Avez-vous au moins une cible ?"
                    onChange={setField("hasTarget")}
                  />
                </Line>
                {hasTarget ? (
                  <>
                    <Line>
                      <SelectNumber
                        value={targetCount}
                        name="Nombre de cibles"
                        label="Nombre de cibles"
                        max={MAX_TARGET_COUNT}
                        onChange={setField("targetCount")}
                      />
                    </Line>
                    {targetCount ? (
                      <NestedItem depth={1}>
                        <PiradsSelect
                          formId={formId}
                          items={piradsItems}
                          onChange={onUpdatePiradsItem}
                        />
                      </NestedItem>
                    ) : undefined}
                  </>
                ) : undefined}
              </>
            ) : undefined}
          </>
        ) : undefined}
      </Section>

      <Section title="Biopsies" index={2}>
        <Line>
          {/* CAUTION:
          This question is redundant with some previous questions but it is on
          done on purpose, as info given to anatomical pathologists is not
          always standardized.
        */}
          <Select
            name="Container count"
            value={containerCount}
            label="Combien de pots avez-vous ?"
            options={CONTAINER_COUNT_OPTIONS}
            onChange={setField("containerCount")}
          />
        </Line>
      </Section>

      <Item hasMaxWidth={false}>
        <ProstateBiopsyTable
          formId={formId}
          language={DEFAULT_LANGUAGE}
          rows={rows}
          score={score}
          onChange={setField("rows")}
        />
      </Item>

      <Item>
        {score.tumorCount ? (
          <Select
            name="Type histologique de la tumeur"
            label="Type histologique de la tumeur"
            options={TUMOR_TYPES}
            value={tumorType}
            onChange={setField("tumorType")}
          />
        ) : undefined}
        <ValidationErrors errors={errors} />
      </Item>

      <Section title="Immunohistochimie" index={3}>
        <Immunohistochemistry
          containerCount={containerCount}
          groups={PROSTATE_ANTIBODY_GROUPS}
          properties={PROSTATE_ANTIBODY_PROPERTIES}
          state={ihc}
          setState={setField("ihc")}
        />
      </Section>

      <AdditionalRemarks
        index={4}
        value={comment}
        onChange={setField("comment")}
      />

      {errors.length ? undefined : (
        <Summary
          getContent={(language) =>
            generateReport(
              {
                formId,
                ...state,
                piradsItems,
                score,
                rows,
              },
              language,
            )
          }
          getTable={(language) => (
            <ProstateBiopsyTable
              formId={formId}
              language={language}
              rows={rows}
              score={score}
              isReadOnly
              onChange={noop}
            />
          )}
        />
      )}
    </FormPage>
  );
};
