import { useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputText } from "../../ui/InputText";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { range } from "../../ui/helpers";
import { aMessage } from "../../ui/mock";
import { YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { BiopsiesProstatiquesTable } from "./BiopsiesProstatiquesTable";
import { Row } from "./constants";

const MAX_TARGET_COUNT = 3;

// TODO: extract PIRADS components to a dedicated file

type PiradsItem = {
  count: number;
  location: string;
};

const aPiradsItem = (): PiradsItem => ({
  count: 0,
  location: "b",
});

// PIRADS: Prostate Imaging Reporting & Data System
const PiradsSelect = ({
  value,
  onChange,
}: {
  value: PiradsItem;
  onChange: (value: PiradsItem) => void;
}) => {
  const onChangeCount = (count: number) => onChange({ ...value, count });
  const onChangeLocation = (location: string) =>
    onChange({ ...value, location });

  return (
    <Line>
      <SelectNumber
        name="PIRADS count" // TODO: check this with Louis
        label="PIRADS"
        min={2}
        max={5}
        value={value.count}
        onChange={onChangeCount}
      />{" "}
      située à <InputText value={value.location} onChange={onChangeLocation} />
    </Line>
  );
};

const anEmptyRow = (index: number): Row => ({
  index,
  type: "sextan",
  location: "base-right",
  biopsy: { count: 2, size: [0, 0] },
  tumor: {
    count: 0,
    size: [0, 0],
    gleason: [0, 0],
    epn: false,
    tep: false,
    pin: false,
  },
  otherLesions: "",
});

export const BiopsiesProstatiques = () => {
  // Form state

  const [hasInfo, setHasInfo] = useBoolean();
  const [hasTarget, setHasTarget] = useBoolean();
  const [targetCount, setTargetCount] = useNumber();
  const [piradsItems, setPiradsItems] = useState<PiradsItem[]>(
    range(MAX_TARGET_COUNT).map(aPiradsItem),
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
            <Summary
              content={
                // TODO: un-mock
                JSON.stringify({ rows })
              }
            />
          </Item>
        </>
      ) : undefined}
    </div>
  );
};
