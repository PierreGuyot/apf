import { SelectPresence } from "../../ui";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  isReadOnly?: boolean; // TODO clean: implement
};

export const HasLymphoVascularInvasion = (props: Props) => {
  return (
    <SelectPresence
      label="Invasion lymphatique ou vasculaire"
      grammaticalForm={{ gender: "feminine", number: "singular" }}
      value={props.value}
      onChange={props.onChange}
    />
  );
};
