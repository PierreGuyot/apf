import { HasEpn } from "../../../common/epn/HasEpn";
import { FormPage } from "../../../common/FormPage";
import {
  IhcState,
  validateIhc,
} from "../../../common/immunohistochemistry/helpers";
import { Immunohistochemistry } from "../../../common/immunohistochemistry/Immunohistochemistry";
import { HasLymphoVascularInvasion } from "../../../common/invasion/HasLymphoVascularInvasion";
import { ResectionMacroscopy } from "../../../common/resection-macroscopy/ResectionMacroscopy";
import {
  ColorationType,
  SamplingType,
  validateMacroscopy,
} from "../../../common/resection-macroscopy/validation";
import {
  DEFAULT_LANGUAGE,
  InputTextArea,
  Line,
  Section,
  Select,
  SelectList,
  Stack,
  Summary,
  Text,
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
  isGleasonScoreApplicable,
  MAIN_LESION_TYPES,
  MainLesionType,
  PREVIOUS_TREATMENT_GROUPS,
  PreviousTreatment,
  ProstateResectionFormId,
  TUMOR_QUANTIFICATION_OPTIONS,
  TumorQuantification,
} from "./helpers";
import { generateReport } from "./report";

export type FormState = {
  previousTreatments: PreviousTreatment[];
  caseSummary: string;
  chipWeight: number; // In grams
  samplingType: SamplingType;
  blockCount: number;
  coloration: ColorationType;
  mainLesionType: MainLesionType;
  tumorType: TumorType;
  histologicalGrade: GleasonItem;
  tumorQuantification: TumorQuantification;
  hasLymphaticOrVascularInvasion: boolean;
  hasEpn: boolean;
  otherLesions: OtherLesionType[];
  ihc: IhcState;
};

const getInitialState = (): FormState => ({
  previousTreatments: [],
  caseSummary: "",
  chipWeight: 0,
  blockCount: 1,
  coloration: "HES",
  samplingType: "full",
  mainLesionType: "prostate-adenomyoma",
  tumorType: "acinar-adenocarcinoma-conventional",
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
    previousTreatments,
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
        <Section title="Renseignements cliniques" index={1}>
          <SelectList
            label="Traitements antérieurs"
            groups={PREVIOUS_TREATMENT_GROUPS}
            values={previousTreatments}
            onChange={setField("previousTreatments")}
          />
          <InputTextArea
            label="Autres renseignements cliniques"
            value={caseSummary}
            placeholder="Ajoutez ici les renseignements cliniques."
            onChange={setField("caseSummary")}
          />
        </Section>

        <ResectionMacroscopy
          index={2}
          state={state}
          setState={(value) => setState({ ...state, ...value })}
          errors={macroscopyErrors}
        />

        <Section title="Microscopie" index={3}>
          <Select
            label="Quel est le type de la lésion principale ?"
            options={MAIN_LESION_TYPES}
            value={mainLesionType}
            onChange={setField("mainLesionType")}
          />

          {mainLesionType === "tumor" ? (
            <>
              <Select
                label="Type histologique de la tumeur"
                options={TUMOR_TYPES}
                value={tumorType}
                onChange={setField("tumorType")}
              />
              {isGleasonScoreApplicable(previousTreatments) ? (
                <Line>
                  Score de Gleason :{" "}
                  <CellGleason
                    language={DEFAULT_LANGUAGE}
                    value={histologicalGrade}
                    onChange={setField("histologicalGrade")}
                  />
                </Line>
              ) : (
                <Line>
                  <Text color="secondary">
                    Gleason score is not applicable.
                  </Text>
                </Line>
              )}
              <Select
                label="Estimation de la surface envahie"
                options={TUMOR_QUANTIFICATION_OPTIONS}
                value={tumorQuantification}
                onChange={setField("tumorQuantification")}
              />
              <HasLymphoVascularInvasion
                value={hasLymphaticOrVascularInvasion}
                onChange={setField("hasLymphaticOrVascularInvasion")}
              />
              <HasEpn value={hasEpn} onChange={setField("hasEpn")} />
            </>
          ) : undefined}
          <SelectList
            label="Autres lésions"
            values={otherLesions}
            groups={OTHER_LESION_GROUPS}
            onChange={setField("otherLesions")}
          />
        </Section>

        <Section title="Immunohistochimie" index={4}>
          <Immunohistochemistry
            containerCount={blockCount}
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
