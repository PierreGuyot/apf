import { HasEpn } from "../../../common/epn/HasEpn";
import { HasLymphoVascularInvasion } from "../../../common/invasion/HasLymphoVascularInvasion";
import {
  InputNumber,
  Line,
  patchState,
  Select,
  SubSection,
  Text,
} from "../../../ui";
import { TumorData } from "./DermatologyForm";
import { SelectClarkInfiltrationLevel } from "./SelectClarkInfiltrationLevel";
import {
  EXCISION_TYPES,
  MARGIN_POSITIONS,
  OperationType,
  TUMOR_PROPERTIES,
  TUMOR_TYPE_OPTIONS,
} from "./helpers";

export const TumoralLesionSection = ({
  index,
  operationType,
  isOriented,
  state,
  setState,
}: {
  index: number;
  operationType: OperationType;
  isOriented: boolean;
  state: TumorData;
  setState: (tumor: TumorData) => void;
}) => {
  const setField = patchState(state, setState);
  const {
    mainTumorType,
    secondaryTumorType,
    excisionType,
    minDepthMargin,
    minSideMargin,
    marginPosition,
    hasLymphaticOrVascularInvasion,
    hasEpn,
    infiltrationLevel,
  } = state;

  const {
    hasSelectLymphaticOrVascularInvasion,
    hasSelectPerineuralInvasion,
    hasSelectClarkInfiltrationLevel,
  } = TUMOR_PROPERTIES[mainTumorType];

  return (
    <SubSection>
      {/* TODO clean: improve styling */}
      <Line>
        <Text as="div" variant="bold">
          Lésion {index + 1}
        </Text>
      </Line>
      <Select
        label="Quel est le type de la tumeur cutanée principale ?"
        value={mainTumorType}
        options={TUMOR_TYPE_OPTIONS}
        onChange={setField("mainTumorType")}
      />
      <Select
        label="Quel est le type des tumeurs cutanées adjacentes ?"
        value={secondaryTumorType}
        options={TUMOR_TYPE_OPTIONS}
        onChange={setField("secondaryTumorType")}
      />
      <Select
        label="Préciser l'exérèse de la lésion :"
        value={excisionType}
        options={EXCISION_TYPES}
        onChange={setField("excisionType")}
      />

      {/*
        Only display this section if the:
        - Operation type is not a biopsy
        - Excision type has margins
      */}
      {operationType !== "biopsy" && excisionType !== "complete" ? (
        <>
          <Line>
            <InputNumber
              label="Taille de la marge latérale minimale"
              value={minDepthMargin}
              onChange={setField("minDepthMargin")}
              unit="mm"
            />
            {isOriented ? (
              <Select
                options={MARGIN_POSITIONS}
                value={marginPosition}
                onChange={setField("marginPosition")}
              />
            ) : undefined}
          </Line>
          <InputNumber
            label="Préciser la marge profonde minimale"
            value={minSideMargin}
            onChange={setField("minSideMargin")}
            unit="mm"
          />
        </>
      ) : undefined}
      {hasSelectPerineuralInvasion ? (
        <HasEpn value={hasEpn} onChange={setField("hasEpn")} />
      ) : undefined}
      {hasSelectLymphaticOrVascularInvasion ? (
        <HasLymphoVascularInvasion
          value={hasLymphaticOrVascularInvasion}
          onChange={setField("hasLymphaticOrVascularInvasion")}
        />
      ) : undefined}
      {hasSelectClarkInfiltrationLevel ? (
        <SelectClarkInfiltrationLevel
          value={infiltrationLevel}
          onChange={setField("infiltrationLevel")}
        />
      ) : undefined}
    </SubSection>
  );
};
