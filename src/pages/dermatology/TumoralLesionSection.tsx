import { SelectLymphaticOrVascularInvasion } from "../../common/SelectLymphaticOrVascularInvasion";
import { SelectPerineuralInvasion } from "../../common/SelectPerineuralInvasion";
import { InputNumber, Line, patchState, Select, SubSection } from "../../ui";
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
        <b>Lésion {index + 1}</b>
      </Line>
      <Line>
        <Select
          label="Quel est le type de la tumeur cutanée principale ?"
          value={mainTumorType}
          options={TUMOR_TYPE_OPTIONS}
          onChange={setField("mainTumorType")}
        />
      </Line>
      <Line>
        <Select
          label="Quel est le type des tumeurs cutanées adjacentes ?"
          value={secondaryTumorType}
          options={TUMOR_TYPE_OPTIONS}
          onChange={setField("secondaryTumorType")}
        />
      </Line>
      <Line>
        <Select
          label="Préciser l'exérèse de la lésion :"
          value={excisionType}
          options={EXCISION_TYPES}
          onChange={setField("excisionType")}
        />
      </Line>

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
          <Line>
            <InputNumber
              label="Préciser la marge profonde minimale"
              value={minSideMargin}
              onChange={setField("minSideMargin")}
              unit="mm"
            />
          </Line>
        </>
      ) : undefined}

      {hasSelectLymphaticOrVascularInvasion ? (
        <Line>
          <SelectLymphaticOrVascularInvasion
            value={hasLymphaticOrVascularInvasion}
            onChange={setField("hasLymphaticOrVascularInvasion")}
          />
        </Line>
      ) : undefined}
      {hasSelectPerineuralInvasion ? (
        <Line>
          <SelectPerineuralInvasion
            value={hasEpn}
            onChange={setField("hasEpn")}
          />
        </Line>
      ) : undefined}
      {hasSelectClarkInfiltrationLevel ? (
        <Line>
          <SelectClarkInfiltrationLevel
            value={infiltrationLevel}
            onChange={setField("infiltrationLevel")}
          />
        </Line>
      ) : undefined}
    </SubSection>
  );
};
