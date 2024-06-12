import { useMemo } from "react";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { AntibodySection } from "./_AntibodySection";
import { ANTIBODIES_PROPERTIES, Antibody, AntibodyData } from "./_helpers";
import { patchState } from "../../ui/helpers/form-state";

export type IhcState = {
  hasIhc: boolean;
  antibodies: AntibodyData[];
};

type Props = {
  containerCount: number;
  options: Option<Antibody>[];
  state: IhcState;
  setState: (state: IhcState) => void;
};

const anEmptyAntibodyData = (options: Option<Antibody>[]): AntibodyData => {
  const defaultType = options[0].value;
  const { clones } = ANTIBODIES_PROPERTIES[defaultType];
  const defaultClone = clones[0].value;

  return {
    type: defaultType,
    clone: defaultClone,
    blocks: [],
  };
};

export const Immunohistochemistry = ({
  containerCount,
  options,
  state,
  setState,
}: Props) => {
  const { hasIhc, antibodies } = state;
  const setField = patchState(state, setState);

  const groups = useMemo(
    () => [
      {
        title: "", // TODO clean: fix API
        items: options,
      },
    ],
    [options],
  );

  const selectedAntibodies = antibodies.map((antibody) => antibody.type);

  const onSelectAntibodies = (newSelection: Antibody[]) => {
    const updatedMap = new Map(
      antibodies.map((antibody) => [antibody.type, antibody]),
    );

    const oldSet = new Set(selectedAntibodies);
    const newSet = new Set(newSelection);

    for (const { value } of options) {
      // Value has been added
      if (!oldSet.has(value) && newSet.has(value)) {
        updatedMap.set(value, anEmptyAntibodyData(options));
      }

      // Value has been deleted
      if (oldSet.has(value) && !newSet.has(value)) {
        updatedMap.delete(value);
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
          {antibodies.map((antibody, index) => (
            <AntibodySection
              key={antibody.type}
              containerCount={containerCount}
              state={antibody}
              setState={(value) => {
                const updatedAntibodies = [...antibodies];
                updatedAntibodies[index] = value;
                setField("antibodies")(updatedAntibodies);
              }}
            />
          ))}
        </>
      ) : undefined}
    </>
  );
};
