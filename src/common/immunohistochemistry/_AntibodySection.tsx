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
  PropertiesByAntibody,
} from "./helpers";

type Props = {
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
};

export const AntibodySection = ({ properties, state, setState }: Props) => {
  const { type, result } = state;
  const setField = patchState(state, setState);

  const content = useMemo(() => {
    if (type === "other") {
      const { name, clone, result } = state;

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
                  value={name}
                  onChange={(value) => setState({ ...state, name: value })}
                />
                <InputText
                  label="Clone utilisé"
                  labelSize="sm"
                  value={clone}
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
                  value={result}
                  onChange={setField("result")}
                />
              </Item>
            </div>
          </SubSection>
        </div>
      );
    }

    const { clone } = state;
    const { clones, label } = ANTIBODIES_PROPERTIES[type];
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
          value={clone}
          onChange={setField("clone")}
        />
        <Select
          name="Résultat immunohistochimie"
          label="Résultat"
          labelSize="sm"
          options={resultOptions}
          value={result}
          onChange={setField("result")}
        />
      </div>
    );
  }, [properties, result, setField, setState, state, type]);

  return <>{content}</>;
};
