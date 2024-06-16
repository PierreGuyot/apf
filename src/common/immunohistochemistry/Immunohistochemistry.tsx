import { useMemo } from "react";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { patchState } from "../../ui/helpers/form-state";
import { YES_NO_OPTIONS } from "../../ui/helpers/options";
import { AntibodySection } from "./_AntibodySection";
import {
  ANTIBODIES_PROPERTIES,
  Antibody,
  AntibodyData,
  AntibodyGroup,
  IhcState,
  OtherAntibody,
  PropertiesByAntibody,
} from "./helpers";

type Props = {
  containerCount: number;
  groups: AntibodyGroup[];
  properties: PropertiesByAntibody;
  state: IhcState;
  setState: (state: IhcState) => void;
};

const anEmptyAntibodyData = (type: Antibody | "other"): AntibodyData => {
  if (type === "other") {
    return {
      type,
      name: "",
      clone: "",
      conclusion: "",
      blocks: [],
    } satisfies OtherAntibody;
  }

  const { clones } = ANTIBODIES_PROPERTIES[type];
  const defaultClone = clones[0].value;

  return {
    type: type,
    clone: defaultClone,
    blocks: [],
  };
};

export const Immunohistochemistry = ({
  containerCount,
  groups: _groups,
  properties,
  state,
  setState,
}: Props) => {
  const { hasIhc, antibodies } = state;
  const setField = patchState(state, setState);

  const selectedAntibodies = antibodies.map((antibody) => antibody.type);

  // Patched groups with fallback option `other`
  const groups = useMemo(
    () => [
      ..._groups,
      {
        title: "OTHER",
        items: [{ value: "other" as const, label: "Autre" }],
      },
    ],
    [_groups],
  );

  const onSelectAntibodies = (newSelection: Array<Antibody | "other">) => {
    const updatedMap = new Map(
      antibodies.map((antibody) => [antibody.type, antibody]),
    );

    const oldSet = new Set(selectedAntibodies);
    const newSet = new Set(newSelection);

    for (const { items } of groups) {
      for (const { value } of items) {
        // Value has been added
        if (!oldSet.has(value) && newSet.has(value)) {
          updatedMap.set(value, anEmptyAntibodyData(value));
        }

        // Value has been deleted
        if (oldSet.has(value) && !newSet.has(value)) {
          updatedMap.delete(value);
        }
      }
    }

    setField("antibodies")(Array.from(updatedMap.values()));
  };

  return (
    <>
      <Line>
        <Select
          value={hasIhc}
          options={YES_NO_OPTIONS}
          name="Immunohistochimie"
          label="Avez-vous réalisé une immunohistochimie ?"
          onChange={setField("hasIhc")}
        />
      </Line>
      {hasIhc ? (
        <>
          <Line>
            Quels anticorps avez-vous réalisés ?
            <SelectList
              value={selectedAntibodies}
              groups={groups}
              onChange={onSelectAntibodies}
            />
          </Line>
          {antibodies.map((antibody, index) => {
            return (
              <AntibodySection
                key={antibody.type}
                containerCount={containerCount}
                properties={properties}
                state={antibody}
                setState={(value) => {
                  const updatedAntibodies = [...antibodies];
                  updatedAntibodies[index] = value;
                  setField("antibodies")(updatedAntibodies);
                }}
              />
            );
          })}
        </>
      ) : undefined}
    </>
  );
};
