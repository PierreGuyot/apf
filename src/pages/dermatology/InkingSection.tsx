import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { SubSection } from "../../ui/SubSection";
import { YES_NO_OPTIONS } from "../../ui/helpers/options";
import { SetState } from "../../ui/helpers/use-form";
import {
  INKING_COLORS_OPTIONS,
  INKING_COLOR_GROUPS,
  InkingColor,
  InkingLimit,
  LIMIT_OPTIONS,
  getInkingColorOption,
} from "./inking.helpers";

type Inking = {
  color: InkingColor;
  limit: InkingLimit;
};

export type InkingState = {
  hasInking: boolean;
  inkings: Inking[];
};

const anEmptyInking = (color: InkingColor) => ({
  color,
  limit: LIMIT_OPTIONS[0].value,
});

type Props = {
  state: InkingState;
  setState: (state: InkingState) => void;
};

export const InkingSection = ({ state, setState: _setState }: Props) => {
  const { hasInking, inkings } = state;
  // TODO: extract dedicated state helper
  const setState: SetState<InkingState> = (key) => (value) =>
    _setState({ ...state, [key]: value });

  const selectedInkings = inkings.map((inking) => inking.color);

  const onSelectInkings = (newSelection: InkingColor[]) => {
    const updatedMap = new Map(inkings.map((inking) => [inking.color, inking]));

    const oldSet = new Set(selectedInkings);
    const newSet = new Set(newSelection);

    for (const { value } of INKING_COLORS_OPTIONS) {
      // Value has been added
      if (!oldSet.has(value) && newSet.has(value)) {
        updatedMap.set(value, anEmptyInking(value));
      }

      // Value has been deleted
      if (oldSet.has(value) && !newSet.has(value)) {
        updatedMap.delete(value);
      }
    }

    setState("inkings")(Array.from(updatedMap.values()));
  };

  return (
    <>
      <Line>
        <Select
          name="Encrage de la lésion"
          label="Avez vous réalisé un encrage"
          value={hasInking}
          options={YES_NO_OPTIONS}
          onChange={setState("hasInking")}
        />
      </Line>
      {hasInking ? (
        <>
          <Line>
            Quelles encres avez-vous utilisées ?
            <SelectList
              groups={INKING_COLOR_GROUPS}
              value={selectedInkings}
              onChange={onSelectInkings}
            />
          </Line>
          {/* TODO: fix spacing here */}
          {inkings.length ? (
            <Line>Désignez la localisation spatiale de chaque encre :</Line>
          ) : undefined}
          <SubSection>
            {inkings.map((inking, index) => {
              const { label } = getInkingColorOption(inking.color);
              return (
                <Line key={inking.color}>
                  <Select
                    name="Localisation de l'encre"
                    label={`Encre ${label}`}
                    options={LIMIT_OPTIONS}
                    value={inking.limit}
                    onChange={(value) => {
                      const updatedInkings = [...inkings];
                      updatedInkings[index] = {
                        ...updatedInkings[index],
                        limit: value,
                      };
                      setState("inkings")(updatedInkings);
                    }}
                  />
                </Line>
              );
            })}
          </SubSection>
        </>
      ) : undefined}
    </>
  );
};
