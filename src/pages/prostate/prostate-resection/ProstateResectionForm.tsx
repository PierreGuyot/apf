import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import {
  IhcState,
  validateIhc,
} from "../../../common/immunohistochemistry/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection.helpers";
import { ResectionMacroscopy } from "../../../common/ResectionMacroscopy";
import { SelectLymphaticOrVascularInvasion } from "../../../common/SelectLymphaticOrVascularInvasion";
import { SelectPerineuralInvasion } from "../../../common/SelectPerineuralInvasion";
import {
  DEFAULT_LANGUAGE,
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
  PROSTATE_ANTIBODY_GROUPS,
  PROSTATE_ANTIBODY_PROPERTIES,
  TUMOR_TYPES,
  TumorType,
} from "../helpers";
import { CellGleason } from "../prostate-biopsy/cells";
import {
  isApplicable,
  MAIN_LESION_TYPES,
  MainLesionType,
  PRIOR_CONDITION_OPTIONS,
  PriorCondition,
  ProstateResectionFormId,
  TUMOR_QUANTIFICATION_OPTIONS,
  TumorQuantification,
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
  ihc: IhcState;
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
  ihc: {
    hasIhc: false,
    blocks: [
      {
        index: 1,
        antibodies: [],
      },
    ],
  },
});

type Props = {
  formId: ProstateResectionFormId;
};

export const ProstateResectionForm = ({ formId }: Props) => {
  // State
  const { state, setField, clearState, setState } = useForm(getInitialState);
  const {
    caseSummary,
    chipWeight,
    blockCount,
    mainLesionType,
    tumorType,
    priorConditions,
    histologicalGrade,
    tumorQuantification,
    hasLymphaticOrVascularInvasion,
    hasEpn,
    otherLesions,
    ihc,
  } = state;

  const macroscopyErrors = validateMacroscopy({ chipWeight, blockCount });
  const ihcErrors = validateIhc({ ihc, hasMultipleBlocks: false });
  const hasErrors = !!macroscopyErrors.length || !!ihcErrors!.length;

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <ClinicalInfo
          index={1}
          value={caseSummary}
          onChange={setField("caseSummary")}
        />

        <ResectionMacroscopy
          index={1}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={macroscopyErrors}
        />

        <Section title="Microscopie" index={3}>
          <Line>
            <Select
              label="Quel est le type de la lésion principale ?"
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
            <SelectList
              label="Autres lésions"
              values={otherLesions}
              groups={OTHER_LESION_GROUPS}
              onChange={setField("otherLesions")}
            />
          </Line>
        </Section>

        <Section title="Immunohistochimie" index={4}>
          <Immunohistochemistry
            groups={PROSTATE_ANTIBODY_GROUPS}
            properties={PROSTATE_ANTIBODY_PROPERTIES}
            state={ihc}
            setState={setField("ihc")}
          />

          <ValidationErrors
            header="La section Immunohistochimie comporte les erreurs suivantes :"
            errors={ihcErrors}
          />
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
