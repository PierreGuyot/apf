import { Select } from "../../ui/Select";
import { FieldProps } from "../../ui/helpers/fields";
import { filterEmpty, toOption } from "../../ui/helpers/helpers";
import { Option } from "../../ui/helpers/options";
import { getPercentageOptions } from "../../ui/helpers/percent";
import { Language } from "../../ui/language";
import { GLEASON_SCORES, GleasonItem, GleasonScore } from "./helpers";

import css from "./select-gleason.module.css";
import { getCribriformPercentageOptions, getGleasonSummary } from "./helpers";

const Plus = () => <span>+</span>;

const GLEASON_SCORE_OPTIONS: Option<GleasonScore>[] =
  GLEASON_SCORES.map(toOption);
const SelectGleasonScore = (props: FieldProps<GleasonScore>) => (
  <Select name="Gleason score" options={GLEASON_SCORE_OPTIONS} {...props} />
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

export const SelectGleason = ({
  language,
  value,
  isReadOnly,
  onChange,
}: {
  language: Language;
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
    return <span>{getGleasonSummary(value, language)}</span>;
  }

  const SelectCribriformPercentage = (
    <Select
      key="cribriform-percentage"
      name="Pourcentage cribriforme"
      options={getCribriformPercentageOptions(language)}
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
    <SelectGleasonScore
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
    <SelectGleasonScore
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

  return <span className={css.main}>{items}</span>;
};
