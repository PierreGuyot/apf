import { useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { range, sum, sumPairs } from "../../ui/helpers";
import { YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { BiopsiesProstatiquesTable } from "./BiopsiesProstatiquesTable";
import { PiradsSelect } from "./PiradsSelect";
import {
  PiradsItem,
  Row,
  SEXTAN_COUNT,
  Score,
  anEmptyPiradsItem,
  anEmptyRow,
  generateReport,
  getMaximumByGleasonScore,
} from "./helpers";

const MAX_TARGET_COUNT = 3;

// TODO: create a Block component to handle max width
// TODO: re-organize ui folder (layout, inputs, table, etc.)

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
  const [potCount, setPotCount] = useNumber();
  const [comment, setComment] = useString();

  // Table state

  // TODO: un-mock initial value
  const [rows, setRows] = useState<Row[]>(range(6).map(anEmptyRow));

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

  const getErrors = () => {
    const errors: string[] = [];

    const sextans = rows.filter((row) => row.type === "sextan");
    const targets = rows.filter((row) => row.type === "target");
    const targetCount = targets.length;
    const expectedTargetCount = potCount - SEXTAN_COUNT;

    if (targetCount !== expectedTargetCount) {
      // TODO: extract a plural helper
      errors.push(
        `Le tableau devrait contenir ${expectedTargetCount} ${expectedTargetCount > 1 ? "cibles" : "cible"} et non ${targetCount}.`,
      );
    }

    const locations = new Set(sextans.map((sextan) => sextan.location));
    if (locations.size !== 6) {
      errors.push(
        `Le tableau devrait contenir un et un seul sextan à chacune des six positions.`,
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
        {/* TODO: is this option actually useful? */}
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
        <InputNumber
          value={potCount}
          label="Combien de pots avez-vous ?"
          onChange={setPotCount}
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
      {/* TODO: generate summary from data (french) */}
      {/* TODO: generate summary from data (english) */}
      {/* TODO: add button to switch languages */}
      <Item>
        <Summary content={generateReport({ score, rows, comment })} />
      </Item>
    </div>
  );
};
