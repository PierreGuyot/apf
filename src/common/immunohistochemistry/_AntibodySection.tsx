import { useMemo } from "react";
import { InputText } from "../../ui/InputText";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Select } from "../../ui/Select";
import { SubSection } from "../../ui/SubSection";
import { patchState } from "../../ui/helpers/form-state";
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
  // TODO clean: consider using ErrorBoundary
  const antibodyProperties = properties[state.type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }

  const resultOptions = antibodyProperties.resultOptions;

  return (
    <div
      /* TODO clean: use `Spacing` component */
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold" }}>{label}</div>
      <Select
        name="Clone utilisé"
        label="Clone utilisé"
        labelSize="sm"
        options={clones}
        value={state.clone}
        onChange={setField("clone")}
      />
      <Select
        name="Résultat immunohistochimie"
        label="Résultat"
        labelSize="sm"
        options={resultOptions}
        value={state.result}
        onChange={setField("result")}
      />
    </div>
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
    // TODO clean: use `Spacing` component
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold" }}>Autre</div>
      <SubSection>
        {/* TODO clean: use `Spacing` component */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* TODO clean: use `Spacing` component */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
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
          </div>
          <Item>
            {/* TODO clean: use a `Text` component and `Spacing` component */}
            <div style={{ fontSize: "0.9rem", marginBottom: "4px" }}>
              Résultat immunohistochimie
            </div>
            <InputTextArea
              lineCount={2}
              value={state.result}
              onChange={setField("result")}
            />
          </Item>
        </div>
      </SubSection>
    </div>
  );
};
