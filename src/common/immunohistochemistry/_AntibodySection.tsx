import {
  Button,
  InputText,
  patchState,
  Select,
  Stack,
  SubSection,
  Text,
} from "../../ui";
import {
  aNewOtherAntibody,
  ANTIBODIES_PROPERTIES,
  AntibodyData,
  OtherAntibodies,
  OtherAntibody,
  PropertiesByAntibody,
  StandardAntibody,
} from "./helpers";
import { AntibodyOtherError } from "./validation";

type Props = {
  properties: PropertiesByAntibody;
  state: AntibodyData;
  setState: (value: AntibodyData) => void;
  errors: AntibodyOtherError[];
};

export const AntibodySection = ({
  properties,
  state,
  setState,
  errors,
}: Props) => {
  if (state.type === "others") {
    return (
      <OtherAntibodySection state={state} setState={setState} errors={errors} />
    );
  }

  return (
    <AntibodyForm properties={properties} state={state} setState={setState} />
  );
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
      <Stack width={ANTIBODY_TYPE_WIDTH}>
        <Text variant="bold">{label}</Text>
      </Stack>
      <Select
        width="150px"
        label="Clone"
        labelSize="sm"
        options={clones}
        value={state.clone}
        onChange={setField("clone")}
      />
      {typeof resultOptions === "undefined" ? (
        <InputText
          label="Résultat"
          labelSize="sm"
          value={state.result}
          onChange={setField("result")}
        />
      ) : (
        <Select
          label="Résultat"
          labelSize="sm"
          options={resultOptions}
          value={state.result}
          onChange={setField("result")}
        />
      )}
    </Stack>
  );
};

const OtherAntibodySection = ({
  state,
  setState,
  errors,
}: {
  state: OtherAntibodies;
  setState: (value: OtherAntibodies) => void;
  errors: AntibodyOtherError[];
}) => {
  const setField = patchState(state, setState);
  const onAdd = () => {
    const updatedItems = [...state.values, aNewOtherAntibody()];
    setField("values")(updatedItems);
  };
  const onDelete = (index: number) => {
    const updatedItems = state.values.filter((_, i) => i !== index);
    setField("values")(updatedItems);
  };

  return (
    <Stack spacing="md">
      <Stack width={ANTIBODY_TYPE_WIDTH}>
        <Text variant="bold">Autres</Text>
      </Stack>
      <SubSection>
        <Stack spacing="sm">
          {state.values.map((value, index) => (
            <OtherAntibodyItem
              key={index}
              itemCount={state.values.length}
              state={value}
              setState={(newValue) => {
                const newValues = [...state.values];
                newValues[index] = newValue;
                setField("values")(newValues);
              }}
              onDelete={() => onDelete(index)}
              errors={errors[index]}
            />
          ))}
        </Stack>
        <Button label="Ajouter un anticorps autre" onClick={onAdd} />
      </SubSection>
    </Stack>
  );
};

const OtherAntibodyItem = ({
  state,
  setState,
  itemCount,
  onDelete,
  errors,
}: {
  state: OtherAntibody;
  setState: (value: OtherAntibody) => void;
  itemCount: number;
  onDelete: () => void;
  errors: AntibodyOtherError;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Stack direction="row" spacing="md">
        <InputText
          label="Nom"
          labelSize="sm"
          value={state.name}
          onChange={setField("name")}
          errors={errors.name}
        />
        <InputText
          label="Clone"
          labelSize="sm"
          value={state.clone}
          onChange={setField("clone")}
        />
        <InputText
          label="Résultat"
          labelSize="sm"
          value={state.result}
          onChange={setField("result")}
          errors={errors.result}
        />
        {itemCount === 1 ? undefined : (
          <Button label="Supprimer" onClick={onDelete} />
        )}
      </Stack>
    </>
  );
};
