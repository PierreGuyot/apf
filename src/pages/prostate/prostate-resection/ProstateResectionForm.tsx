import { Banner } from "../../../ui/Banner";
import { InputNumber } from "../../../ui/InputNumber";
import { InputTextArea } from "../../../ui/InputTextArea";
import { Line } from "../../../ui/Line";
import { Page } from "../../../ui/Page";
import { Section } from "../../../ui/Section";
import { Select } from "../../../ui/Select";
import { SelectList } from "../../../ui/SelectList";
import { Summary } from "../../../ui/Summary";
import { Title } from "../../../ui/Title";
import { FORMS } from "../../../ui/helpers/forms";
import { YES_NO_OPTIONS } from "../../../ui/helpers/options";
import { useForm } from "../../../ui/helpers/use-form";
import { DEFAULT_LANGUAGE } from "../../../ui/language";
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

export const ProstateResectionForm = ({ formId }: Props) => {
  const form = FORMS[formId];

  // State
  const { state, setState, clearState } = useForm(getInitialState);
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

  return (
    <Page title={form.title}>
      <Banner formId={formId} onClear={clearState} />

      <Section>
        <Title title="Renseignements cliniques" index={1} />
        <InputTextArea
          value={caseSummary}
          placeholder="TODO"
          onChange={setState("caseSummary")}
        />
      </Section>

      <Section>
        <Title title="Macroscopie" index={2} />
        <Line>
          Poids des copeaux :{" "}
          <InputNumber
            value={chipWeight}
            unit="g"
            isDecimal
            onChange={setState("chipWeight")}
          />
        </Line>
        <Line>
          <Select
            name="Type d'échantillonnage"
            options={SAMPLING_TYPES}
            value={samplingType}
            onChange={setState("samplingType")}
          />{" "}
          en{" "}
          <InputNumber value={blockCount} onChange={setState("blockCount")} />{" "}
          blocs (fixation : formol tamponné 4%, coloration:{" "}
          <Select
            name="Coloration de l'inclusion"
            options={COLORATION_OPTIONS}
            value={coloration}
            onChange={setState("coloration")}
          />
          )
        </Line>
      </Section>

      <Section>
        <Title title="Microscopie" index={3} />
        <Line>
          <Select
            label="Quelle est le type de la lésion principale ?"
            name="Type de la lésion principale"
            options={MAIN_LESION_TYPES}
            value={mainLesionType}
            onChange={setState("mainLesionType")}
          />
        </Line>

        {mainLesionType === "tumor" ? (
          <>
            <Line>
              <Select
                label="Type histologique de la tumeur"
                name="Type histologique de la tumeur"
                options={TUMOR_TYPES}
                value={tumorType}
                onChange={setState("tumorType")}
              />
            </Line>
            <Line>
              <Select
                label="Conditions pré-existantes"
                name="Conditions pré-existantes"
                options={PRIOR_CONDITION_OPTIONS}
                value={priorConditions}
                onChange={setState("priorConditions")}
              />
            </Line>
            {isApplicable(priorConditions) ? (
              <Line>
                Score de Gleason :{" "}
                <CellGleason
                  language={DEFAULT_LANGUAGE}
                  value={histologicalGrade}
                  onChange={setState("histologicalGrade")}
                />
              </Line>
            ) : undefined}
            <Line>
              <Select
                name="Estimation de la surface envahie"
                label="Estimation de la surface envahie"
                options={TUMOR_QUANTIFICATION_OPTIONS}
                value={tumorQuantification}
                onChange={setState("tumorQuantification")}
              />
            </Line>
            <Line>
              <Select
                value={hasLymphaticOrVascularInvasion}
                options={YES_NO_OPTIONS}
                name="Emboles vasculaires ou lymphatique"
                label="Emboles vasculaires ou lymphatique"
                onChange={setState("hasLymphaticOrVascularInvasion")}
              />
            </Line>
            <Line>
              <Select
                value={hasEpn}
                options={YES_NO_OPTIONS}
                name="Engainements périnerveux"
                label="Engainements périnerveux"
                onChange={setState("hasEpn")}
              />
            </Line>
          </>
        ) : undefined}
        <Line>
          <div>Autres lésions</div>
          <SelectList
            value={otherLesions}
            groups={OTHER_LESION_GROUPS}
            onChange={setState("otherLesions")}
          />
        </Line>
      </Section>

      <Summary
        getContent={(language) =>
          generateReport({ formId, ...state }, language)
        }
      />
    </Page>
  );
};
