import { Fragment } from "react";
import {
  ErrorList,
  filterNullish,
  HelpIcon,
  InputNumber,
  Language,
  range,
  Select,
  SelectBoolean,
  SelectList,
  Stack,
} from "../../../ui";
import { SelectGleason } from "../SelectGleason";
import { GleasonItem, OTHER_LESION_GROUPS, OtherLesionType } from "../helpers";

export const CellSelectList = (props: {
  values: OtherLesionType[];
  onChange: (value: OtherLesionType[]) => void;
  isReadOnly: boolean;
  language?: Language;
}) => <SelectList groups={OTHER_LESION_GROUPS} {...props} />;
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: {
  language?: Language;
  value: boolean;
  isReadOnly?: boolean;
  onChange: (value: boolean) => void;
}) => <SelectBoolean {...props} />;

const Plus = () => <span>+</span>;

export const CellSize = ({
  values,
  onChange,
  inputCount,
  isReadOnly,
  errors,
}: {
  values: number[];
  isReadOnly?: boolean;
  onChange: (value: number[]) => void;
  inputCount: number;
  errors: {
    fields: Array<string | undefined>;
    total?: string;
  };
}) => {
  return (
    <Stack direction="row" spacing="sm" alignItems="center">
      <Stack direction="row" alignItems="center" spacing="xs">
        {range(inputCount).map((_, i) => (
          <Fragment key={i}>
            <InputNumber
              value={values[i]}
              isReadOnly={isReadOnly}
              onChange={(updatedNumber) => {
                const updatedArray = [...values];
                updatedArray[i] = updatedNumber;
                onChange(updatedArray);
              }}
              errors={errors.fields[i]}
            />
            {i === inputCount - 1 ? undefined : <Plus />}
          </Fragment>
        ))}
      </Stack>
      {errors.total && errors.fields.filter(filterNullish).length === 0 ? (
        <HelpIcon
          variant="error"
          size="xs"
          content={<ErrorList errors={[errors.total]} />}
        />
      ) : undefined}
    </Stack>
  );
};

export const CellGleason = ({
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
  const { a, b } = value;

  return (
    <Stack direction="row" alignItems="center" spacing="xs">
      <div>{a + b}</div>
      {"("}
      <SelectGleason
        language={language}
        value={value}
        isReadOnly={isReadOnly}
        onChange={onChange}
      />
      {")"}
    </Stack>
  );
};
