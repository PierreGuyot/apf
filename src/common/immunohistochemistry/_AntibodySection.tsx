import { InputText } from "../../ui/InputText";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SubSection } from "../../ui/SubSection";
import { patchState } from "../../ui/helpers/form-state";
import {
  ANTIBODIES_PROPERTIES,
  AntibodyData,
  PropertiesByAntibody,
} from "./helpers";

type Props = {
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
};

export const AntibodySection = ({ properties, state, setState }: Props) => {
  const { type } = state;

  const title =
    type === "other"
      ? state.name
        ? `Autre (${state.name})`
        : "Autre"
      : ANTIBODIES_PROPERTIES[type].label;

  return (
    <SubSection title={title}>
      <AntibodyForm properties={properties} state={state} setState={setState} />
    </SubSection>
  );
};

const AntibodyForm = ({
  properties,
  state,
  setState,
}: {
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
}) => {
  const { type, result } = state;
  const setField = patchState(state, setState);

  if (type === "other") {
    const { name, clone, result } = state;

    return (
      <>
        <Line>
          <InputText
            label="Nom de l'anticorps"
            value={name}
            onChange={(value) => setState({ ...state, name: value })}
          />
        </Line>
        <Line>
          <InputText
            label="Nom du clone utilisé"
            value={clone}
            onChange={setField("clone")}
          />
        </Line>
        <Item>
          <InputTextArea
            lineCount={2}
            label="Résultat immunohistochimie"
            value={result}
            onChange={(value) => setState({ ...state, result: value })}
          />
        </Item>
      </>
    );
  }

  const { clone } = state;
  const { clones } = ANTIBODIES_PROPERTIES[type];
  // TODO clean: consider activating noUncheckedIndexedAccess in tsconfig.json
  // TODO clean: consider using ErrorBoundary
  const antibodyProperties = properties[state.type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }

  const resultOptions = antibodyProperties.resultOptions;

  return (
    <>
      <Line>
        <Select
          label="Nom du clone utilisé"
          name="Clone utilisé"
          options={clones}
          value={clone}
          onChange={setField("clone")}
        />
      </Line>
      <Line>
        <Select
          label="Résultat immunohistochimie"
          name="Résultat immunohistochimie"
          options={resultOptions}
          value={result}
          onChange={setField("result")}
        />
      </Line>
    </>
  );
};
