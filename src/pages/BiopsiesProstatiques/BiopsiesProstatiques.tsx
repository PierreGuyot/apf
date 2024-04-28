import { useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { range } from "../../ui/helpers";
import { YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { BiopsiesProstatiquesTable } from "./BiopsiesProstatiquesTable";
import { PiradsSelect } from "./PiradsSelect";
import {
  PiradsItem,
  Row,
  anEmptyPiradsItem,
  anEmptyRow,
  generateReport,
} from "./helpers";

const MAX_TARGET_COUNT = 3;

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
                  {piradsItems.slice(0, targetCount).map((item, i) => (
                    <Line key={i}>
                      <PiradsSelect
                        value={item}
                        onChange={(value) => onUpdatePiradsItem(value, i)}
                      />
                    </Line>
                  ))}
                </>
              ) : undefined}
            </>
          ) : undefined}

          <Line>
            <InputNumber
              value={potCount}
              label="Combien de pots avez-vous ?"
              onChange={setPotCount}
            />
          </Line>

          <Item>
            <BiopsiesProstatiquesTable rows={rows} onChange={setRows} />
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
            <Summary content={generateReport({ rows, comment })} />
          </Item>
        </>
      ) : undefined}
    </div>
  );
};
