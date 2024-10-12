import { useMemo } from "react";
import {
  InputText,
  InputTextArea,
  Item,
  patchState,
  Select,
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
  // TODO clean: consider using ErrorBoundary
  const antibodyProperties = properties[state.type];
  if (!antibodyProperties) {
    throw new Error("Missing antibody properties");
  }

  const resultOptions = antibodyProperties.resultOptions;

  return (
    <div
      /* TODO clean: use `Stack` component */
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold", width: ANTIBODY_TYPE_WIDTH }}>
        {label}
      </div>
      <Select
        width="150px"
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
    // TODO clean: use `Stack` component
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* TODO clean: extract `Text` component */}
      <div style={{ fontWeight: "bold", width: ANTIBODY_TYPE_WIDTH }}>
        Autre
      </div>
      <SubSection>
        {/* TODO clean: use `Stack` component */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* TODO clean: use `Stack` component */}
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
            {/* TODO clean: use a `Text` component and `Stack` component */}
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
