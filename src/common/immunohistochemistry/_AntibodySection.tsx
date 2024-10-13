import { useMemo } from "react";
import {
  InputText,
  InputTextArea,
  Item,
  patchState,
  Select,
  Stack,
  SubSection,
} from "../../ui";
import {
  ANTIBODIES_PROPERTIES,
  AntibodyData,
  OtherAntibody,
  PropertiesByAntibody,
  StandardAntibody,
} from "./helpers";

type Props = {
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
};

export const AntibodySection = ({ properties, state, setState }: Props) => {
  const content = useMemo(() => {
    if (state.type === "other") {
      return <OtherAntibodyForm state={state} setState={setState} />;
    }

    return (
      <AntibodyForm properties={properties} state={state} setState={setState} />
    );
  }, [properties, setState, state]);

  return <>{content}</>;
};

const ANTIBODY_TYPE_WIDTH = "90px";

const AntibodyForm = ({
  properties,
  state,
  setState,
}: {
  properties: PropertiesByAntibody;
  state: StandardAntibody;
  setState: (value: StandardAntibody) => void;
}) => {
  const setField = patchState(state, setState);

  const { clones, label } = ANTIBODIES_PROPERTIES[state.type];
  // TODO clean: consider activating noUncheckedIndexedAccess in tsconfig.json
  const antibodyProperties = properties[state.type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }

  const resultOptions = antibodyProperties.resultOptions;

  return (
    <Stack direction="row" alignItems="center" spacing="md">
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold", width: ANTIBODY_TYPE_WIDTH }}>
        {label}
      </div>
      <Select
        width="150px"
        label="Clone utilisé"
        labelSize="sm"
        options={clones}
        value={state.clone}
        onChange={setField("clone")}
      />
      <Select
        label="Résultat"
        labelSize="sm"
        options={resultOptions}
        value={state.result}
        onChange={setField("result")}
      />
    </Stack>
  );
};

const OtherAntibodyForm = ({
  state,
  setState,
}: {
  state: OtherAntibody;
  setState: (value: OtherAntibody) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <Stack spacing="md">
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold", width: ANTIBODY_TYPE_WIDTH }}>
        Autre
      </div>
      <SubSection>
        <Stack spacing="sm">
          <Stack direction="row" spacing="md" wrap="wrap">
            <InputText
              label="Nom de l'anticorps"
              labelSize="sm"
              value={state.name}
              onChange={setField("name")}
            />
            <InputText
              label="Clone utilisé"
              labelSize="sm"
              value={state.clone}
              onChange={setField("clone")}
            />
          </Stack>
          <Item>
            <InputTextArea
              label="Résultat immunohistochimie"
              lineCount={2}
              value={state.result}
              onChange={setField("result")}
            />
          </Item>
        </Stack>
      </SubSection>
    </Stack>
  );
};
