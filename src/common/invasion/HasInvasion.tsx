import { SelectBoolean, SelectTroolean, Troolean } from "../../ui";

type Props =
  | {
      isOptional?: false;
      value: boolean;
      onChange: (value: boolean) => void;
      isReadOnly?: boolean; // TODO clean: implement
    }
  | {
      isOptional: true;
      value: Troolean;
      onChange: (value: Troolean) => void;
      isReadOnly?: boolean; // TODO clean: implement
    };

const LABEL = "Emboles vasculaires ou lymphatiques";

// Lymphatic or vascular invasion
export const HasInvasion = (props: Props) => {
  if (props.isOptional) {
    return (
      <SelectTroolean
        label={LABEL}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }

  return (
    <SelectBoolean
      label={LABEL}
      value={props.value}
      onChange={props.onChange}
    />
  );
};
