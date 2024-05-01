import { useMemo, useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { range, sum, sumArrays } from "../../ui/helpers";
import { YES_NO_OPTIONS } from "../../ui/options";
import { count } from "../../ui/plural";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { BiopsiesProstatiquesTable } from "./BiopsiesProstatiquesTable";
import { PiradsSelect } from "./PiradsSelect";
import { SelectContainerCount } from "./cells";
import {
  ContainerCount,
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

export const BiopsiesProstatiques = () => {
  const [hasInfo, setHasInfo] = useBoolean();
  const [hasTarget, setHasTarget] = useBoolean();
  const [targetCount, setTargetCount] = useNumber();
  const [hasMri, setHasMri] = useBoolean();
  const [psaRate, setPsaRate] = useNumber(); // Prostatic Specific Antigen
  const [containerCount, setContainerCount] =
    useState<ContainerCount>(MAX_CONTAINER_COUNT);
  const [comment, setComment] = useString();

  // For rows and piradsItems, we handle the maximum number of items in all
  // cases and simply hide according to count.
  // This way, changing the count doesn't erase previous user input.
  const [_rows, setRows] = useState<Row[]>(getRows());
  const rows = useMemo(
    () => _rows.slice(0, containerCount),
    [containerCount, _rows],
  );
  const [_piradsItems, setPiradsItems] =
    useState<PiradsItem[]>(getPiradsItems());
  const piradsItems = useMemo(
    () => _piradsItems.slice(0, targetCount),
    [_piradsItems, targetCount],
  );

  const score = getScore(rows);
  const errors = getErrors({ rows, containerCount, piradsItems });

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [..._piradsItems];
    updatedArray[index] = value;
    setPiradsItems(updatedArray);
  };

  return (
    <div>
      <Line>
        <Select
          value={hasInfo}
          options={YES_NO_OPTIONS}
          name="Renseignements cliniques"
          label="Avez-vous des renseignements cliniques ?"
          onChange={setHasInfo}
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
              onChange={setPsaRate}
            />
          </Line>
          <Line>
            <Select
              value={hasMri}
              options={YES_NO_OPTIONS}
              name="IRM"
              label="Avez-vous une IRM ?"
              onChange={setHasMri}
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
                  onChange={setHasTarget}
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
                      onChange={setTargetCount}
                    />
                  </Line>
                  {/* We handle the maximum number of items in all cases and simply hide according to count
                  This way, changing the count doesn't erase user input */}
                  {targetCount ? (
                    <Item depth={1}>
                      <PiradsSelect
                        items={piradsItems}
                        onChange={onUpdatePiradsItem}
                      />
                    </Item>
                  ) : undefined}
                </>
              ) : undefined}
            </>
          ) : undefined}
        </>
      ) : undefined}
      <Line>
        {/* CAUTION:
          This question is redundant with some previous questions but it is on
          done on purpose, as info given to anatomical pathologists is not
          always standardized.
        */}
        <SelectContainerCount
          value={containerCount}
          label="Combien de pots avez-vous ?"
          onChange={setContainerCount}
        />
      </Line>

      <Item>
        <BiopsiesProstatiquesTable
          rows={rows}
          score={score}
          errors={errors}
          onChange={setRows}
        />
      </Item>
      <Item>
        <InputTextArea
          value={comment}
          label="Remarques particulières"
          placeholder="Ajoutez vos remarques additionnelles dans ce champ."
          onChange={setComment}
        />
      </Item>
      <Item>
        <Summary
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
      </Item>
    </div>
  );
};
