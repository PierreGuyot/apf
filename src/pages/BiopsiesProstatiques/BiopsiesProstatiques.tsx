import { useMemo, useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { range, sum, sumPairs } from "../../ui/helpers";
import { YES_NO_OPTIONS } from "../../ui/options";
import { pluralize } from "../../ui/plural";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { BiopsiesProstatiquesTable } from "./BiopsiesProstatiquesTable";
import { PiradsSelect } from "./PiradsSelect";
import {
  LOCATIONS,
  PiradsItem,
  ContainerCount,
  Row,
  SEXTAN_COUNT,
  Score,
  anEmptyPiradsItem,
  anEmptyRow,
  getMaximumByGleasonScore,
  MAX_CONTAINER_COUNT,
  MAX_TARGET_COUNT,
} from "./helpers";
import { generateReport } from "./report";
import { SelectContainerCount } from "./cells";

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

export const BiopsiesProstatiques = () => {
  // Form state

  const [hasInfo, setHasInfo] = useBoolean();
  const [hasTarget, setHasTarget] = useBoolean();
  const [targetCount, setTargetCount] = useNumber();
  const [piradsItems, setPiradsItems] = useState<PiradsItem[]>(
    range(MAX_TARGET_COUNT).map(anEmptyPiradsItem),
  );
  const [hasMri, setHasMri] = useBoolean();
  const [psaRate, setPsaRate] = useNumber(); // Prostatic Specific Antigen
  const [containerCount, setContainerCount] =
    useState<ContainerCount>(MAX_CONTAINER_COUNT);
  const [comment, setComment] = useString();

  // Table state

  const [_rows, setRows] = useState<Row[]>(getRows());
  // We handle the maximum number of items in all cases and simply hide according to count
  // This way, changing the count doesn't erase user input
  const rows = useMemo(
    () => _rows.slice(0, containerCount),
    [containerCount, _rows],
  );

  const score: Score = {
    biopsyCount: sum(rows.map((row) => row.biopsyCount)),
    biopsySize: sumPairs(rows.map((row) => row.biopsySize)),
    tumorCount: sum(rows.map((row) => row.tumorCount)),
    tumorSize: sumPairs(rows.map((row) => row.tumorSize)),
    tumorGleason: getMaximumByGleasonScore(rows.map((row) => row.tumorGleason)),
    tumorEpn: rows.map((row) => row.tumorEpn).some(Boolean),
    tumorTep: rows.map((row) => row.tumorTep).some(Boolean),
    tumorPin: rows.map((row) => row.tumorPin).some(Boolean),
  };

  // TODO: debug this
  const getErrors = () => {
    const errors: string[] = [];

    const sextans = rows.filter((row) => row.type === "sextan");
    const targets = rows.filter((row) => row.type === "target");
    const targetCount = targets.length;
    const expectedTargetCount = containerCount - SEXTAN_COUNT;

    if (targetCount !== expectedTargetCount) {
      errors.push(
        `Le tableau devrait contenir ${pluralize(expectedTargetCount, "cible")} et non ${targetCount}.`,
      );
    }

    const locations = new Set(sextans.map((sextan) => sextan.location));
    if (locations.size !== SEXTAN_COUNT) {
      errors.push(
        `Le tableau devrait contenir un et un seul sextant à chacune des six positions.`,
      );
    }

    return errors;
  };

  // Callbacks

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [...piradsItems];
    updatedArray[index] = value;
    setPiradsItems(updatedArray);
  };

  // Template

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
                        items={piradsItems.slice(0, targetCount)}
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
          errors={getErrors()}
          onChange={setRows}
        />
      </Item>
      <Item>
        <InputTextArea
          value={comment}
          label="Remarques particulières"
          // TODO: add examples
          placeholder="Ajoutez vos remarques additionnelles dans ce champ."
          onChange={setComment}
        />
      </Item>
      <Item>
        <Summary
          getContent={(language) =>
            generateReport({ score, rows: rows, comment, language })
          }
        />
      </Item>
    </div>
  );
};
