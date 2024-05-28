import { useMemo } from "react";
import { AdditionalRemarks } from "../../ui/AdditionalRemarks";
import { Banner } from "../../ui/Banner";
import { InputNumber } from "../../ui/InputNumber";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Page } from "../../ui/Page";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { Title } from "../../ui/Title";
import { FORMS } from "../../ui/helpers/forms";
import { range, sum, sumArrays, toOption } from "../../ui/helpers/helpers";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { count } from "../../ui/helpers/plural";
import { isDebug } from "../../ui/helpers/state";
import { useForm } from "../../ui/helpers/use-form";
import { PiradsSelect } from "./PiradsSelect";
import { ProstateBiopsyTable } from "./ProstateBiopsyTable";
import {
  LOCATIONS,
  MAX_CONTAINER_COUNT,
  MAX_TARGET_COUNT,
  PiradsItem,
  Row,
  SEXTAN_COUNT,
  Score,
  anEmptyPiradsItem,
  anEmptyRow,
  getMaximumByGleasonScore,
} from "./helpers";
import { generateReport } from "./report";
import { Section } from "../../ui/Section";
import { NestedItem } from "../../ui/NestedItem";

const FORM_ID = "prostate-biopsy";

const CONTAINER_COUNT = [6, 7, 8, 9] as const;
const CONTAINER_COUNT_OPTIONS: Option<number>[] = CONTAINER_COUNT.map(toOption);

// TODO: test extensively
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
        tumorPin: rowsWithTumor.map((row) => row.tumorPin).some(Boolean),
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

// TODO: test extensively
const getErrors = ({
  rows,
  containerCount,
  piradsItems,
}: {
  rows: Row[];
  containerCount: number;
  piradsItems: PiradsItem[];
}) => {
  const errors: string[] = [];

  const sextans = rows.filter((row) => row.type === "sextan");
  const sextantCount = sextans.length;
  const targets = rows.filter((row) => row.type === "target");
  const targetCount = targets.length;
  const expectedTargetCount = containerCount - SEXTAN_COUNT;

  if (targetCount !== expectedTargetCount) {
    errors.push(
      `Le tableau devrait contenir ${count(expectedTargetCount, "cible")} et non ${targetCount}.`,
    );
    errors.push(
      `Le tableau devrait contenir ${count(SEXTAN_COUNT, "sextan")} et non ${sextantCount}.`,
    );
  }

  const locations = new Set(sextans.map((sextan) => sextan.location));
  if (locations.size !== SEXTAN_COUNT) {
    errors.push(
      `Le tableau devrait contenir un et un seul sextant à chacune des six positions.`,
    );
  }

  rows.forEach((row, index) => {
    if (row.tumorCount > row.biopsyCount) {
      errors.push(
        `Le nombre de biopsies présentant une tumeur pour le pot numéro ${index + 1} est plus grand que le nombre de biopsies.`,
      );
    }
  });

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
  comment: string;
};

const getPiradsItems = () => range(MAX_TARGET_COUNT).map(anEmptyPiradsItem);

const getRows = () => [
  // 6 sextans (each for one location)
  ...LOCATIONS.map((location, index) =>
    anEmptyRow({ index, location, type: "sextan" }),
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
  rows: getRows(),
  piradsItems: getPiradsItems(),
  comment: "",
});

export const ProstateBiopsyForm = () => {
  const form = FORMS[FORM_ID];

  // State
  const { state, setState, clearState } = useForm(getInitialState);
  const {
    hasInfo,
    hasTarget,
    targetCount,
    hasMri,
    psaRate,
    containerCount,
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
    rows,
    containerCount: state.containerCount,
    piradsItems,
  });

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [...piradsItems];
    updatedArray[index] = value;
    setState("piradsItems")(updatedArray);
  };

  return (
    <Page title={form.title}>
      <Banner formId={FORM_ID} onClear={clearState} />

      <Section>
        <Title title="Renseignements cliniques" index={1}></Title>
        <Line>
          <Select
            value={hasInfo}
            options={YES_NO_OPTIONS}
            name="Renseignements cliniques"
            label="Avez-vous des renseignements cliniques ?"
            onChange={setState("hasInfo")}
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
                onChange={setState("psaRate")}
              />
            </Line>
            <Line>
              <Select
                value={hasMri}
                options={YES_NO_OPTIONS}
                name="IRM"
                label="Avez-vous une IRM ?"
                onChange={setState("hasMri")}
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
                    onChange={setState("hasTarget")}
                  />
                </Line>
                {hasTarget ? (
                  <>
                    <Line>
                      {/* TODO with Louis: should these be optional cells in the table (after a container of type `target`)? */}
                      <SelectNumber
                        value={targetCount}
                        name="Nombre de cibles"
                        label="Nombre de cibles"
                        max={MAX_TARGET_COUNT}
                        onChange={setState("targetCount")}
                      />
                    </Line>
                    {/* We handle the maximum number of items in all cases and simply hide according to count
                  This way, changing the count doesn't erase user input */}
                    {targetCount ? (
                      <NestedItem depth={1}>
                        <PiradsSelect
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

      <Section>
        <Title title="Biopsies" index={2}></Title>
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
            onChange={setState("containerCount")}
          />
        </Line>
      </Section>

      <Item hasMaxWidth={false}>
        <ProstateBiopsyTable
          rows={rows}
          score={score}
          errors={errors}
          onChange={setState("rows")}
        />
      </Item>

      <AdditionalRemarks
        index={3}
        value={comment}
        onChange={setState("comment")}
      />

      {errors.length ? undefined : (
        <Summary
          index={4}
          getContent={(language) =>
            generateReport({
              hasInfo,
              hasTarget,
              targetCount,
              hasMri,
              psaRate,
              containerCount,
              piradsItems,
              score,
              rows,
              comment,
              language,
            })
          }
        />
      )}
    </Page>
  );
};
