import { Fragment } from "react/jsx-runtime";
import { InputNumber } from "../../ui/InputNumber";
import { Select } from "../../ui/Select";
import { SelectList } from "../../ui/SelectList";
import { filterEmpty, range, toOption } from "../../ui/helpers/helpers";
import { FieldProps } from "../../ui/helpers/helpers.types";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import { getPercentageOptions } from "../../ui/helpers/percent";
import "./cells.css";
import {
  CRIBRIFORM_PERCENTAGE_OPTIONS,
  GLEASON_SCORES,
  GleasonItem,
  GleasonScore,
  OTHER_LESION_GROUPS,
  OtherLesionType,
  getGleasonSummary,
} from "./helpers";

export const CellSelectList = (props: FieldProps<OtherLesionType[]>) => (
  <SelectList groups={OTHER_LESION_GROUPS} {...props} />
);
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: FieldProps<boolean> & { name: string }) => (
  <Select options={YES_NO_OPTIONS} {...props} />
);

const Plus = () => <span>+</span>;

export const CellNumberSum = ({
  value,
  onChange,
  inputCount,
  isReadOnly,
}: FieldProps<number[]> & { inputCount: number }) => (
  <div className="cell cell-number-sum">
    {range(inputCount).map((_, i) => (
      <Fragment key={i}>
        <InputNumber
          value={value[i]}
          isReadOnly={isReadOnly}
          onChange={(updatedNumber) => {
            const updatedArray = [...value];
            updatedArray[i] = updatedNumber;
            onChange(updatedArray);
          }}
        />
        {i === inputCount - 1 ? undefined : <Plus />}
      </Fragment>
    ))}
  </div>
);

const GLEASON_OPTIONS: Option<GleasonScore>[] = GLEASON_SCORES.map(toOption);
const SelectGleason = (props: FieldProps<GleasonScore>) => (
  <Select name="Gleason score" options={GLEASON_OPTIONS} {...props} />
);

const MAJORITY_PERCENTAGE_OPTIONS = getPercentageOptions({
  min: 50,
  max: 95,
  step: 5,
});
const MINORITY_PERCENTAGE_OPTIONS = getPercentageOptions({
  min: 5,
  max: 50,
  step: 5,
});

export const CellGleason = ({
  value,
  isReadOnly,
  onChange,
}: {
  value: GleasonItem;
  onChange: (value: GleasonItem) => void;
  isReadOnly?: boolean;
}) => {
  const { a, b, percentage, cribriformPercentage } = value;

  // If a === b, don't display repartition percentage (it's necessarily 100%)
  // The sum of majority percentage (left) and minority percentage (right) is constrained to have a sum of 100%
  // If a or b is 4, we display a field for cribriform percentage
  // If a and b are 4, we display the field for cribriform only once (after b for better readability)

  if (isReadOnly) {
    return <span>{getGleasonSummary(value)}</span>;
  }

  const SelectCribriformPercentage = (
    <Select
      key="cribriform-percentage"
      name="Pourcentage cribriforme"
      options={CRIBRIFORM_PERCENTAGE_OPTIONS}
      value={cribriformPercentage}
      onChange={(_cribriformPercentage) =>
        onChange({
          ...value,
          cribriformPercentage: _cribriformPercentage,
        })
      }
      isReadOnly={isReadOnly}
    />
  );

  // CAUTION: this should be aligned on the readonly case
  const items = [
    <SelectGleason
      key="majority-grade"
      value={a}
      isReadOnly={isReadOnly}
      onChange={(_a) => onChange({ ...value, a: _a })}
    />,
    a === b ? undefined : (
      <Select
        key="majority-percentage"
        name="Pourcentage majoritaire"
        options={MAJORITY_PERCENTAGE_OPTIONS}
        value={percentage}
        onChange={(_percentage) =>
          onChange({ ...value, percentage: _percentage })
        }
      />
    ),
    a === 4 && b !== 4 ? SelectCribriformPercentage : undefined,
    <Plus key="plus" />,
    <SelectGleason
      key="minority-grade"
      value={b}
      isReadOnly={isReadOnly}
      onChange={(_b) => onChange({ ...value, b: _b })}
    />,
    a === b ? undefined : (
      <Select
        key="minority-percentage"
        name="Pourcentage minoritaire"
        options={MINORITY_PERCENTAGE_OPTIONS}
        value={100 - percentage}
        onChange={(_percentage) =>
          onChange({ ...value, percentage: 100 - _percentage })
        }
      />
    ),
    b === 4 ? SelectCribriformPercentage : undefined,
  ].filter(filterEmpty);

  return (
    <div className="cell">
      <div className="cell-sum">{a + b}</div>(
      <span className="cell-parentheses">{items}</span>)
    </div>
  );
};
