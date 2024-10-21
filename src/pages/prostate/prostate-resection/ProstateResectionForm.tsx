import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import { SelectLymphaticOrVascularInvasion } from "../../../common/SelectLymphaticOrVascularInvasion";
import { SelectPerineuralInvasion } from "../../../common/SelectPerineuralInvasion";
import {
  DEFAULT_LANGUAGE,
  InputNumber,
  Line,
  Section,
  Select,
  SelectList,
  Stack,
  Summary,
  useForm,
  ValidationErrors,
} from "../../../ui";
import {
  DEFAULT_GLEASON_ITEM,
  GleasonItem,
  OTHER_LESION_GROUPS,
  OtherLesionType,
  TUMOR_TYPES,
  TumorType,
} from "../helpers";
import { CellGleason } from "../prostate-biopsy/cells";
import {
  COLORATION_OPTIONS,
  ColorationType,
  MAIN_LESION_TYPES,
  MainLesionType,
  PRIOR_CONDITION_OPTIONS,
  PriorCondition,
  ProstateResectionFormId,
  SAMPLING_TYPES,
  SamplingType,
  TUMOR_QUANTIFICATION_OPTIONS,
  TumorQuantification,
  isApplicable,
} from "./helpers";
import { generateReport } from "./report";

export type FormState = {
  caseSummary: string;
  chipWeight: number; // In grams
  samplingType: SamplingType;
  blockCount: number;
  coloration: ColorationType;
  mainLesionType: MainLesionType;
  tumorType: TumorType;
  priorConditions: PriorCondition;
  histologicalGrade: GleasonItem;
  tumorQuantification: TumorQuantification;
  hasLymphaticOrVascularInvasion: boolean;
  hasEpn: boolean;
  otherLesions: OtherLesionType[];
};

const getInitialState = (): FormState => ({
  caseSummary: "",
  chipWeight: 0,
  blockCount: 0,
  coloration: "HES",
  samplingType: "full",
  mainLesionType: "prostate-adenomyoma",
  tumorType: "acinar-adenocarcinoma-conventional",
  priorConditions: "none",
  histologicalGrade: DEFAULT_GLEASON_ITEM,
  tumorQuantification: ">5%",
  hasLymphaticOrVascularInvasion: false,
  hasEpn: false,
  otherLesions: [],
});

type Props = {
  formId: ProstateResectionFormId;
};

// TODO clean: test extensively
const validateMacroscopy = ({
  chipWeight,
  blockCount,
}: {
  chipWeight: number;
  blockCount: number;
}) => {
  const errors: string[] = [];

  if (!chipWeight) {
    errors.push("Le poids des copeaux est égal à 0.");
  }

  if (!blockCount) {
    errors.push("Le nombre de blocs est égal à 0.");
  }

  return errors;
};

export const ProstateResectionForm = ({ formId }: Props) => {
  // State
  const { state, setField, clearState } = useForm(getInitialState);
  const {
    caseSummary,
    chipWeight,
    blockCount,
    coloration,
    samplingType,
    mainLesionType,
    tumorType,
    priorConditions,
    histologicalGrade,
    tumorQuantification,
    hasLymphaticOrVascularInvasion,
    hasEpn,
    otherLesions,
  } = state;

  const macroscopyErrors = validateMacroscopy({
    chipWeight,
    blockCount,
  });
  const hasErrors = !!macroscopyErrors.length;

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <ClinicalInfo
          index={1}
          value={caseSummary}
          onChange={setField("caseSummary")}
        />

        <Section title="Macroscopie" index={2}>
          <Line>
            <InputNumber
              label="Poids des copeaux :"
              value={chipWeight}
              unit="g"
              isDecimal
              onChange={setField("chipWeight")}
            />
          </Line>
          <Line>
            <Select
              options={SAMPLING_TYPES}
              value={samplingType}
              onChange={setField("samplingType")}
            />{" "}
            <InputNumber value={blockCount} onChange={setField("blockCount")} />{" "}
            blocs (fixation : formol tamponné 4%, coloration:{" "}
            <Select
              options={COLORATION_OPTIONS}
              value={coloration}
              onChange={setField("coloration")}
            />
            )
          </Line>
          <ValidationErrors
            header="La section Macroscopie comporte les erreurs suivantes :"
            errors={macroscopyErrors}
          />
        </Section>

        <Section title="Microscopie" index={3}>
          <Line>
            <Select
              label="Quelle est le type de la lésion principale ?"
              options={MAIN_LESION_TYPES}
              value={mainLesionType}
              onChange={setField("mainLesionType")}
            />
          </Line>

          {mainLesionType === "tumor" ? (
            <>
              <Line>
                <Select
                  label="Type histologique de la tumeur"
                  options={TUMOR_TYPES}
                  value={tumorType}
                  onChange={setField("tumorType")}
                />
              </Line>
              <Line>
                <Select
                  label="Conditions pré-existantes"
                  options={PRIOR_CONDITION_OPTIONS}
                  value={priorConditions}
                  onChange={setField("priorConditions")}
                />
              </Line>
              {isApplicable(priorConditions) ? (
                <Line>
                  Score de Gleason :{" "}
                  <CellGleason
                    language={DEFAULT_LANGUAGE}
                    value={histologicalGrade}
                    onChange={setField("histologicalGrade")}
                  />
                </Line>
              ) : undefined}
              <Line>
                <Select
                  label="Estimation de la surface envahie"
                  options={TUMOR_QUANTIFICATION_OPTIONS}
                  value={tumorQuantification}
                  onChange={setField("tumorQuantification")}
                />
              </Line>
              <SelectLymphaticOrVascularInvasion
                value={hasLymphaticOrVascularInvasion}
                onChange={setField("hasLymphaticOrVascularInvasion")}
              />
              <SelectPerineuralInvasion
                value={hasEpn}
                onChange={setField("hasEpn")}
              />
            </>
          ) : undefined}
          <Line>
            Autres lésions
            <SelectList
              values={otherLesions}
              groups={OTHER_LESION_GROUPS}
              onChange={setField("otherLesions")}
            />
          </Line>
        </Section>

        {hasErrors ? undefined : (
          <Summary
            getContent={(language) =>
              generateReport({ formId, ...state }, language)
            }
          />
        )}
      </Stack>
    </FormPage>
  );
};
