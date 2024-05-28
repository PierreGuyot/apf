import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { CheckboxList } from "../../ui/CheckboxList";
import { InputNumber } from "../../ui/InputNumber";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { Tooltip } from "../../ui/Tooltip";
import { noop, range, toOption } from "../../ui/helpers/helpers";
import { FieldProps } from "../../ui/helpers/helpers.types";
import { Option, YES_NO_OPTIONS } from "../../ui/helpers/options";
import "./cells.css";
import {
  GLEASON_SCORES,
  GleasonPair,
  GleasonScore,
  OTHER_LESION_TYPES,
  OtherLesionType,
} from "./helpers";
import { Button } from "../../ui/Button";

// TODO clean: extract generic SelectList component
export const CellSelectList = (props: FieldProps<OtherLesionType[]>) => {
  const selectedItems = OTHER_LESION_TYPES.filter((item) =>
    props.value.includes(item.value),
  );

  if (props.isReadOnly) {
    return selectedItems.map((item) => item.label).join(" + ");
  }

  return (
    <div>
      <div className="cell-multi-select">
        <Tooltip
          mode="click"
          content={
            // TODO clean: clean style
            <div style={{ width: "200px" }}>
              <CheckboxList
                items={OTHER_LESION_TYPES}
                values={props.value}
                onChange={props.onChange}
              />
            </div>
          }
        >
          <Button label="+" onClick={noop} />
        </Tooltip>
        {/* TODO clean: extract Pill component */}
        {selectedItems.map((item) => (
          <div key={item.value} className="cell-multi-select-item">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
export const CellNumber = ({ value }: { value: number }) => <b>{value}</b>;
export const CellChoice = Select;

export const CellYesNo = (props: FieldProps<boolean> & { name: string }) => (
  <Select options={YES_NO_OPTIONS} {...props} />
);

const Plus = () => <span className="cell-plus">+</span>;

export const CellNumberSum = ({
  value,
  onChange,
  inputCount,
  isReadOnly,
}: FieldProps<number[]> & { inputCount: number }) => (
  <div className="cell">
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

export const CellGleason = ({
  value: [a, b],
  isReadOnly,
  onChange,
}: FieldProps<GleasonPair>) => {
  if (isReadOnly) {
    return (
      <span>
        {a + b} ({a} + {b})
      </span>
    );
  }

  return (
    <div className="cell">
      <div className="cell-sum">{a + b}</div>(
      <span className="cell-parentheses">
        <SelectGleason
          value={a}
          isReadOnly={isReadOnly}
          onChange={(_a) => onChange([_a, b])}
        />
        <Plus />
        <SelectGleason
          value={b}
          isReadOnly={isReadOnly}
          onChange={(_b) => onChange([a, _b])}
        />
      </span>
      )
    </div>
  );
};
