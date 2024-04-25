import { useState } from "react";
import { ColumnWithTotal, EditableTable } from "../../ui/EditableTable";
import { InputText } from "../../ui/InputText";
import { InputNumber } from "../../ui/InputNumber";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { Summary } from "../../ui/Summary";
import { range, sum } from "../../ui/helpers";
import { aMessage } from "../../ui/mock";
import { YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";
import { InputTextArea } from "../../ui/InputTextArea";

export const BiopsiesProstatiques = () => {
  // TODO: extract state
  // TODO: structure as a nested object to flatten template
  const [hasInfo, setHasInfo] = useBoolean();
  const [hasTarget, setHasTarget] = useBoolean();
  const [hasMri, setHasMri] = useBoolean();
  // TODO: rename
  const [TEMP1, setTEMP1] = useString();
  const [TEMP2, setTEMP2] = useString();
  const [psaRate, setPsaRate] = useNumber(); // Prostatic Specific Antigen
  const [potCount, setPotCount] = useNumber();
  const [comment, setComment] = useString();

  // TODO: un-mock
  type MockUser = { name: string; age: number; isAdmin: boolean };
  const MOCK_COLUMNS: ColumnWithTotal<MockUser>[] = [
    {
      label: "Name",
      key: "name",
      render: (value) => <span>{value}</span>,
    },
    {
      label: "Age",
      key: "age",
      render: (value) => <span>{value}</span>,
      total: (values) => <b>{sum(values)}</b>,
    },
    {
      label: "Is Admin",
      key: "isAdmin",
      render: (value) => <span>{String(value)}</span>,
    },
  ];
  const MOCK_SUMMARY = range(4).map(aMessage).join("\n");

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
                  name="Cible"
                  label="Avez-vous une cible ?"
                  onChange={setHasTarget}
                />
              </Line>
              {hasTarget ? (
                <>
                  <Line>
                    {/* PIRADS: Prostate Imaging Reporting & Data System */}
                    PIRADS <InputText value={TEMP1} onChange={setTEMP1} />{" "}
                    située à <InputText value={TEMP2} onChange={setTEMP2} />
                  </Line>
                  <Line>
                    {/* TODO: it's unclear what to do in the case where there is a target and it doesn't replace one of the sextants */}
                    TODO: sextant position
                  </Line>
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
            <EditableTable columns={MOCK_COLUMNS} rowCount={6} hasFooter />
          </Item>

          <Item>
            <InputTextArea
              value={comment}
              label="Commentaires additionnels"
              placeholder="Ajoutez vos remarques additionnelles dans ce champ."
              onChange={setComment}
            />
          </Item>

          <Item>
            <Summary content={MOCK_SUMMARY} />
          </Item>
        </>
      ) : undefined}
    </div>
  );
};