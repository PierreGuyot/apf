import {
  Line,
  Option,
  Select,
  SelectList,
  SubSection,
  YES_NO_OPTIONS,
  patchState,
} from "../../ui";
import {
  INKING_COLORS_OPTIONS,
  INKING_COLOR_GROUPS,
  INKING_LIMIT_TYPE_OPTIONS,
  InkingColor,
  InkingLimitType,
  getInkingColorOption,
} from "./inking.helpers";

type InkingPosition = 3 | 6 | 9 | 12;
const INKING_POSITIONS: Option<InkingPosition>[] = [
  { value: 3, label: "3h" },
  { value: 6, label: "6h" },
  { value: 9, label: "9h" },
  { value: 12, label: "12h" },
];

type Inking = {
  color: InkingColor;
  limit: InkingLimit;
};

type InkingLimit = {
  type: InkingLimitType;
  start: InkingPosition;
  end: InkingPosition;
};

export type InkingState = {
  hasInking: boolean;
  inkings: Inking[];
};

const anEmptyInking = (color: InkingColor) => ({
  color,
  limit: {
    type: INKING_LIMIT_TYPE_OPTIONS[0].value,
    start: INKING_POSITIONS[0].value,
    end: INKING_POSITIONS[1].value,
  },
});

type Props = {
  state: InkingState;
  setState: (state: InkingState) => void;
};

export const InkingSection = ({ state, setState }: Props) => {
  const { hasInking, inkings } = state;
  const setField = patchState(state, setState);

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

    setField("inkings")(Array.from(updatedMap.values()));
  };

  return (
    <>
      <Line>
        <Select
          label="Avez vous réalisé un encrage"
          value={hasInking}
          options={YES_NO_OPTIONS}
          onChange={setField("hasInking")}
        />
      </Line>
      {hasInking ? (
        <>
          <Line>
            Quelles encres avez-vous utilisées ?
            <SelectList
              groups={INKING_COLOR_GROUPS}
              values={selectedInkings}
              onChange={onSelectInkings}
            />
          </Line>
          {/* TODO clean: fix spacing here */}
          {inkings.length ? (
            <>
              <Line>Désignez la localisation spatiale de chaque encre :</Line>
              <SubSection>
                {inkings.map((inking, index) => {
                  const { label } = getInkingColorOption(inking.color);
                  return (
                    <InkingItem
                      key={inking.color}
                      label={`Encre ${label}`}
                      state={inking.limit}
                      setState={(value) => {
                        const updatedInkings = [...inkings];
                        updatedInkings[index] = {
                          ...updatedInkings[index],
                          limit: value,
                        };
                        setField("inkings")(updatedInkings);
                      }}
                    />
                  );
                })}
              </SubSection>
            </>
          ) : undefined}
        </>
      ) : undefined}
    </>
  );
};

export const InkingItem = ({
  label,
  state,
  setState,
}: {
  label: string;
  state: InkingLimit;
  setState: (value: InkingLimit) => void;
}) => {
  const { type, start, end } = state;

  const setField = patchState(state, setState);

  return (
    <Line>
      <Select
        label={label}
        options={INKING_LIMIT_TYPE_OPTIONS}
        value={type}
        onChange={(value) => setField("type")(value)}
      />
      {/* FIXME: add validation to ensure the two values are different */}
      {state.type === "other" ? (
        <>
          de{" "}
          <Select
            options={INKING_POSITIONS}
            value={start}
            onChange={setField("start")}
          />{" "}
          à{" "}
          <Select
            options={INKING_POSITIONS}
            value={end}
            onChange={setField("end")}
          />{" "}
          dans le sens horaire
        </>
      ) : undefined}
    </Line>
  );
};
