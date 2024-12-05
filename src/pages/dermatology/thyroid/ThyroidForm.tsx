import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { ClinicalInfo } from "../../../common/ClinicalInfo";
import { FormPage } from "../../../common/FormPage";
import {
  InputNumber,
  InputText,
  Section,
  Select,
  SelectBoolean,
  Stack,
  Summary,
  useForm,
} from "../../../ui";
import {
  Focality,
  FOCALITY_OPTIONS,
  Site,
  SITE_OPTIONS,
  SURGERY_TYPE_OPTIONS,
  SurgeryType,
  TUMOR_TYPE_OPTIONS,
  TumorType,
} from "./helpers";
import { generateReport } from "./report";

export type FormState = {
  // Clinical info
  clinicalInfo: string;

  // Macroscopy
  surgeryType: SurgeryType;
  extrathyroidalExtension: boolean;
  hasCompleteExcision: boolean;

  // Microscopy
  focality: Focality;
  site: Site;
  size: number;
  tumorType: TumorType;
  otherTumorType: string;
  mitoticActivity: number;
  isEncapsulated: boolean;

  // Additional remarks
  comments: string;
};

const getInitialState = (): FormState => ({
  clinicalInfo: "",
  surgeryType: "Thyroïdectomie totale",
  extrathyroidalExtension: false,
  hasCompleteExcision: false,
  comments: "",
  focality: "Unifocal",
  size: 0,
  site: "Lobe droit",
  tumorType: "Carcinome papillaire de la thyroïde, classique ",
  otherTumorType: "",
  mitoticActivity: 0,
  isEncapsulated: false,
});

type Props = {
  formId: "thyroid";
};

// TODO: rename to ThyroidCarcinomaForm?
export const ThyroidForm = ({ formId }: Props) => {
  const { state, clearState, setField } = useForm(getInitialState);
  const hasErrors = false; // TODO: add validations

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <ClinicalInfo
          index={1}
          value={state.clinicalInfo}
          onChange={setField("clinicalInfo")}
        />

        <Section index={2} title="Macroscopie">
          <Select
            options={SURGERY_TYPE_OPTIONS}
            value={state.surgeryType}
            onChange={setField("surgeryType")}
          />

          <div>TODO: Taille du prélèvement</div>

          <SelectBoolean
            label="Extension extra-thyroïdienne macroscopique"
            value={state.extrathyroidalExtension}
            onChange={setField("extrathyroidalExtension")}
          />

          <SelectBoolean
            label="Exérèse macroscopique complète"
            value={state.hasCompleteExcision}
            onChange={setField("hasCompleteExcision")}
          />
        </Section>

        <Section index={3} title="Microscopie">
          <Select
            label="Focalité"
            options={FOCALITY_OPTIONS}
            value={state.focality}
            onChange={setField("focality")}
          />

          {state.focality === "Unifocal" ? (
            <>
              <Select
                label="Siège de la lésion"
                options={SITE_OPTIONS}
                value={state.site}
                onChange={setField("site")}
              />

              <InputNumber
                label="Taille microscopique"
                // TODO: add unit
                value={state.size}
                onChange={setField("size")}
              />

              <Select
                label="Type histologique"
                options={TUMOR_TYPE_OPTIONS}
                value={state.tumorType}
                onChange={setField("tumorType")}
              />
              {state.tumorType === "other" ? (
                <InputText
                  value={state.otherTumorType}
                  onChange={setField("otherTumorType")}
                />
              ) : undefined}
              <InputNumber
                label="Activité mitotique"
                // TODO: add unit
                value={state.mitoticActivity}
                onChange={setField("mitoticActivity")}
              />
              <SelectBoolean
                label="Capsule"
                value={state.isEncapsulated}
                onChange={setField("isEncapsulated")}
              />

              {/* TODO: capsularInvasion */}
              {/* TODO: hasLymphaticOrVascularInvasion */}
              {/* TODO: tumoralNecrosis */}
              {/* TODO: extrathyroidalExtension */}
              {/* TODO: margins */}
              {/* TODO: otherLesions */}
              {/* TODO: cCellHyperplasia */}
            </>
          ) : undefined}

          <div>{/* TODO: Parathyroid gland */}</div>
        </Section>

        <div>TODO: IHC section</div>

        <div>TODO: TNM section</div>

        <Section index={4} title="Statut ganglionnaire">
          TODO: Statut ganglionnaire
        </Section>

        <AdditionalRemarks
          index={4}
          value={state.comments}
          onChange={setField("comments")}
        />

        {hasErrors ? undefined : (
          <Summary
            getContent={(language) =>
              generateReport({ form: { ...state, formId }, language })
            }
          />
        )}
      </Stack>
    </FormPage>
  );
};
