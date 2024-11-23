import { AdditionalRemarks } from "../../../common/AdditionalRemarks";
import { FormPage } from "../../../common/FormPage";
import { HasInvasion } from "../../../common/invasion/HasInvasion";
import {
  Button,
  CheckboxList,
  InputNumber,
  InputText,
  InputTextArea,
  NestedItem,
  patchArray,
  patchState,
  range,
  Select,
  SelectBoolean,
  SelectTroolean,
  Stack,
  Summary,
  Title,
  Troolean,
  useForm,
} from "../../../ui";
import {
  BRESLOW_THICKNESS_OPTIONS,
  CLARK_INFILTRATION_LEVELS,
  ClarkInfiltrationLevel,
  DESMOPLASTIC_MELANOMA_OPTIONS,
  DesmoplasticMelanomaOption,
  DIMENSIONS_OPTIONS,
  DimensionsType,
  DISTANCE_OPTIONS,
  DistanceOption,
  Intent,
  INTENT_OPTIONS,
  IS_SPECIFIED_OPTIONS,
  Laterality,
  LATERALITY_OPTIONS,
  LYMPH_NODE_OPTIONS,
  LymphNodeOption,
  LYMPHOCITE_OPTIONS,
  LymphociteOption,
  Margin,
  MARGIN_OPTIONS,
  METASTASIS_LOCATION_OPTIONS,
  MetastasisLocation,
  Orientation,
  ORIENTATION_OPTIONS,
  Pn,
  PN_GROUPS,
  Presence,
  PRESENCE_OPTIONS,
  Pt,
  PT_GROUPS,
  Subtype,
  SUBTYPE_OPTIONS,
  SURGICAL_MARGIN_OPTIONS,
  SurgicalMargin,
  TECHNIQUE_OPTIONS,
  TechniqueOption,
  ThicknessOption,
  TNM_DESCRIPTOR_OPTIONS,
  TnmDescriptor,
} from "./helpers";
import { generateReport } from "./report";

const LINE_COUNT = 2;

// FIXME: regroup content under sections (this should solve max width problems)
// FIXME: improve styling (in particular, add nesting)

export type FormState = {
  tumorSite: { value: "specified" | "unspecified"; details: string };
  intent: Intent;
  specimen: Specimen;
  primaryLesion: PrimaryLesion;
  hasSatelliteLesions: Troolean;
  otherLesions: {
    value: Presence;
    details: string;
  };
  surgicalMargin: {
    option: SurgicalMargin;
    distanceToClosestMargin: DistanceOption;
    location: string;
  };
  breslowThickness: {
    option: ThicknessOption;
    value: number;
  };
  ulceration: {
    presence: Presence;
    value: number;
  };
  mitoticCount: {
    option: "specified" | "unspecified";
    value: number;
  };
  microSatellites: {
    presence: Presence;
    margins: Margin;
  };
  clarkInfiltationLevel: ClarkInfiltrationLevel;
  // FIXME: rename to hasLymphoVascularInvasion (stay consistent everywhere)?
  hasLymphaticOrVascularInvasion: Troolean;
  lymphocites: LymphociteOption;
  tumorRegression: {
    presence: Presence;
    margin: Margin;
  };
  hasNeurotropism: Troolean;
  desmoplasticMelanomaComponent: {
    presence: Presence;
    value: DesmoplasticMelanomaOption;
  };
  associatedMelanocyticLesion: {
    presence: Presence;
    value: string;
  };
  lymphNodesStatus: LymphNodesStatus;
  subtype: {
    value: Subtype;
    otherValue: string;
  };
  ancillaryStudies: AncillaryStudies;
  pathologicalStaging: PathologicalStaging;
  comments: string;
};

type Specimen = {
  laterality: Laterality;
  technique: {
    value: TechniqueOption;
    details: string;
  };
  lymphNodes: {
    value: LymphNodeOption;
    details: string;
  };
  orientation: {
    value: Orientation;
    details: string;
  };
};

type PrimaryLesion = {
  description: string;
  dimensions: {
    value: DimensionsType;
    length: number;
    width: number;
    depth: number;
  };
};

type LymphNodesStatusByType = {
  count: number;
  positiveCount: number;
  extranodalExtension: Troolean;
  maximumDimension: number;
};

type LymphNodesStatus = {
  sentinelNodes: LymphNodesStatusByType & {
    largestMetastasisLocation: MetastasisLocation;
  };
  nonSentinelLymphNodes: LymphNodesStatusByType;
  clinicallyApparentLymphNodes: LymphNodesStatusByType;
};

type Test = {
  name: string;
  result: string;
};

type PathologicalStaging = {
  tnmDescriptors: TnmDescriptor[];
  pt: Pt;
  pn: Pn;
};

type AncillaryStudies = {
  brafTesting: {
    hasBeenPerformed: boolean;
    methodology: string;
    results: string;
  };
  others: Test[];
};

const getInitialState = (): FormState => ({
  tumorSite: { value: "unspecified", details: "" },
  intent: "unspecified",
  specimen: {
    laterality: "unspecified",
    technique: {
      value: "unspecified",
      details: "",
    },
    lymphNodes: {
      value: "not-submitted",
      details: "",
    },
    orientation: {
      value: "unspecified",
      details: "",
    },
  },
  primaryLesion: {
    description: "",
    dimensions: {
      value: "unspecified",
      length: 0,
      width: 0,
      depth: 0,
    },
  },
  hasSatelliteLesions: "unspecified",
  otherLesions: {
    value: "not-identified",
    details: "",
  },
  surgicalMargin: {
    option: "Cannot be assessed",
    distanceToClosestMargin: "",
    location: "",
  },
  breslowThickness: {
    option: "specified",
    value: 0,
  },
  ulceration: {
    presence: "not-identified",
    value: 0,
  },
  mitoticCount: {
    option: "specified",
    value: 0,
  },
  microSatellites: {
    presence: "not-identified",
    margins: "Cannot be assessed",
  },
  clarkInfiltationLevel: 1,
  hasLymphaticOrVascularInvasion: "unspecified",
  lymphocites: "not-identified",
  tumorRegression: {
    presence: "not-identified",
    margin: "Cannot be assessed",
  },
  hasNeurotropism: "unspecified",
  desmoplasticMelanomaComponent: {
    presence: "not-identified",
    value: "",
  },
  associatedMelanocyticLesion: {
    presence: "not-identified",
    value: "",
  },
  lymphNodesStatus: {
    sentinelNodes: {
      count: 0,
      positiveCount: 0,
      extranodalExtension: "yes",
      maximumDimension: 0,
      largestMetastasisLocation: "Subcapsular",
    },
    nonSentinelLymphNodes: {
      count: 0,
      positiveCount: 0,
      extranodalExtension: "yes",
      maximumDimension: 0,
    },
    clinicallyApparentLymphNodes: {
      count: 0,
      positiveCount: 0,
      extranodalExtension: "yes",
      maximumDimension: 0,
    },
  },
  subtype: {
    value: "Low-CSD melanoma (superficial spreading melanoma)",
    otherValue: "",
  },
  ancillaryStudies: {
    brafTesting: {
      hasBeenPerformed: false,
      methodology: "",
      results: "",
    },
    others: range(3).map(anEmptyTest),
  },
  pathologicalStaging: {
    tnmDescriptors: [],
    pt: "TX",
    pn: "none",
  },
  comments: "",
});

const anEmptyTest = () => ({
  name: "",
  result: "",
});

type Props = {
  formId: "invasive-melanoma";
};

// FIXME: translate form
export const InvasiveMelanomaForm = ({ formId }: Props) => {
  const { state, clearState, setField } = useForm(getInitialState);
  const hasErrors = false; // FIXME: add validations

  return (
    <FormPage formId={formId} onClear={clearState}>
      <Stack spacing="lg">
        <Select
          label="Tumor site"
          options={IS_SPECIFIED_OPTIONS}
          value={state.tumorSite.value}
          onChange={(value) =>
            setField("tumorSite")({ ...state.tumorSite, value })
          }
        />
        {state.tumorSite.value === "specified" ? (
          <InputTextArea
            lineCount={LINE_COUNT}
            placeholder="FIXME: add placeholder"
            value={state.tumorSite.details}
            onChange={(value) =>
              setField("tumorSite")({ ...state.tumorSite, details: value })
            }
          />
        ) : undefined}
        <Select
          label="Clinical intent of procedure"
          options={INTENT_OPTIONS}
          value={state.intent}
          onChange={setField("intent")}
        />

        <InputSpecimen state={state.specimen} setState={setField("specimen")} />

        <InputPrimaryLesion
          state={state.primaryLesion}
          setState={setField("primaryLesion")}
        />

        {/* FIXME: check if there is a validation linked to the presence of invasions? Actually, shouldn't this always be the case for this specific form (as per its name)? */}
        <SelectTroolean
          label="Macroscopic satellite lesions"
          value={state.hasSatelliteLesions}
          onChange={setField("hasSatelliteLesions")}
        />

        <Select
          options={PRESENCE_OPTIONS}
          value={state.otherLesions.value}
          onChange={(value) =>
            setField("otherLesions")({ ...state.otherLesions, value })
          }
        />
        {state.otherLesions.value === "present" ? (
          <InputTextArea
            lineCount={LINE_COUNT}
            placeholder="FIXME: add placeholder"
            value={state.otherLesions.details}
            onChange={(value) =>
              setField("otherLesions")({
                ...state.otherLesions,
                details: value,
              })
            }
          />
        ) : undefined}

        <Select
          label="Surgical margin/Tissue edges"
          options={SURGICAL_MARGIN_OPTIONS}
          value={state.surgicalMargin.option}
          onChange={(value) =>
            setField("surgicalMargin")({
              ...state.surgicalMargin,
              option: value,
            })
          }
        />
        {state.surgicalMargin.option ===
        "Not involved by melanoma in situ or invasive melanoma" ? (
          <Select
            label="Distance of melanoma in situ or invasive tumor from closest margin"
            options={DISTANCE_OPTIONS}
            value={state.surgicalMargin.location}
            onChange={(value) =>
              setField("surgicalMargin")({
                ...state.surgicalMargin,
                location: value,
              })
            }
          />
        ) : undefined}
        {state.surgicalMargin.option === "Cannot be assessed" ? undefined : (
          <InputTextArea
            lineCount={LINE_COUNT}
            label="Specify location(s), if possible"
            value={state.surgicalMargin.location}
            onChange={(value) =>
              setField("surgicalMargin")({
                ...state.surgicalMargin,
                location: value,
              })
            }
          />
        )}

        <Select
          label="Breslow thickness"
          options={BRESLOW_THICKNESS_OPTIONS}
          value={state.breslowThickness.option}
          onChange={(value) =>
            setField("breslowThickness")({
              ...state.breslowThickness,
              option: value,
            })
          }
        />
        {state.breslowThickness.option === "unspecified" ? undefined : (
          <InputNumber
            isDecimal
            unit="mm"
            value={state.breslowThickness.value}
            onChange={(value) =>
              setField("breslowThickness")({ ...state.breslowThickness, value })
            }
          />
        )}

        <Select
          label="Ulceration"
          options={PRESENCE_OPTIONS}
          value={state.ulceration.presence}
          onChange={(value) =>
            setField("ulceration")({ ...state.ulceration, presence: value })
          }
        />
        {state.ulceration.presence === "present" ? (
          <InputNumber
            unit="mm"
            value={state.ulceration.value}
            onChange={(value) =>
              setField("ulceration")({ ...state.ulceration, value })
            }
          />
        ) : undefined}

        <Select
          label="Mitotic count"
          options={IS_SPECIFIED_OPTIONS}
          value={state.mitoticCount.option}
          onChange={(value) =>
            setField("mitoticCount")({ ...state.mitoticCount, option: value })
          }
        />
        {state.mitoticCount.option === "specified" ? (
          <InputNumber
            unit="mm-2"
            value={state.mitoticCount.value}
            onChange={(value) =>
              setField("mitoticCount")({ ...state.mitoticCount, value })
            }
          />
        ) : undefined}

        <Select
          label="Microsatellites"
          options={PRESENCE_OPTIONS}
          value={state.microSatellites.presence}
          onChange={(value) =>
            setField("microSatellites")({
              ...state.microSatellites,
              presence: value,
            })
          }
        />
        {state.microSatellites.presence === "present" ? (
          <Select
            label="Microsatellites margins"
            options={MARGIN_OPTIONS}
            value={state.microSatellites.margins}
            onChange={(value) =>
              setField("microSatellites")({
                ...state.microSatellites,
                margins: value,
              })
            }
          />
        ) : undefined}

        <Select
          label="Clark infiltration level"
          options={CLARK_INFILTRATION_LEVELS}
          value={state.clarkInfiltationLevel}
          onChange={setField("clarkInfiltationLevel")}
        />

        <HasInvasion
          isOptional
          value={state.hasLymphaticOrVascularInvasion}
          onChange={setField("hasLymphaticOrVascularInvasion")}
        />

        <Select
          options={LYMPHOCITE_OPTIONS}
          value={state.lymphocites}
          onChange={setField("lymphocites")}
        />

        <Select
          label="Tumor regression"
          options={PRESENCE_OPTIONS}
          value={state.tumorRegression.presence}
          onChange={(value) =>
            setField("tumorRegression")({
              ...state.tumorRegression,
              presence: value,
            })
          }
        />
        {state.tumorRegression.presence === "present" ? (
          <Select
            label="Margins"
            options={MARGIN_OPTIONS}
            value={state.tumorRegression.margin}
            onChange={(value) =>
              setField("tumorRegression")({
                ...state.tumorRegression,
                margin: value,
              })
            }
          />
        ) : undefined}

        <SelectTroolean
          label="Neurotropism"
          value={state.hasNeurotropism}
          onChange={setField("hasNeurotropism")}
        />

        <Select
          label="Desmoplastic melanoma component"
          options={PRESENCE_OPTIONS}
          value={state.desmoplasticMelanomaComponent.presence}
          onChange={(value) =>
            setField("desmoplasticMelanomaComponent")({
              ...state.desmoplasticMelanomaComponent,
              presence: value,
            })
          }
        />
        {state.desmoplasticMelanomaComponent.presence === "present" ? (
          <Select
            options={DESMOPLASTIC_MELANOMA_OPTIONS}
            value={state.desmoplasticMelanomaComponent.value}
            onChange={(value) =>
              setField("desmoplasticMelanomaComponent")({
                ...state.desmoplasticMelanomaComponent,
                value,
              })
            }
          />
        ) : undefined}

        <Select
          label="Associated melanocytic lesion"
          options={PRESENCE_OPTIONS}
          value={state.associatedMelanocyticLesion.presence}
          onChange={(value) =>
            setField("associatedMelanocyticLesion")({
              ...state.associatedMelanocyticLesion,
              presence: value,
            })
          }
        />
        {state.associatedMelanocyticLesion.presence === "present" ? (
          <InputTextArea
            lineCount={LINE_COUNT}
            placeholder="FIXME: add placeholder"
            value={state.associatedMelanocyticLesion.value}
            onChange={(value) =>
              setField("associatedMelanocyticLesion")({
                ...state.associatedMelanocyticLesion,
                value,
              })
            }
          />
        ) : undefined}

        {state.specimen.lymphNodes.value === "submitted" ? (
          <InputLymphNodesStatus
            state={state.lymphNodesStatus}
            setState={setField("lymphNodesStatus")}
          />
        ) : undefined}

        <Select
          label="Melanoma subtype"
          options={SUBTYPE_OPTIONS}
          value={state.subtype.value}
          onChange={(value) => setField("subtype")({ ...state.subtype, value })}
        />
        {state.subtype.value === "other" ? (
          <InputTextArea
            lineCount={LINE_COUNT}
            placeholder="FIXME: add placeholder"
            value={state.subtype.otherValue}
            onChange={(value) =>
              setField("subtype")({ ...state.subtype, otherValue: value })
            }
          />
        ) : undefined}

        <InputAncillaryStudies
          state={state.ancillaryStudies}
          setState={setField("ancillaryStudies")}
        />

        <InputPathologicalStaging
          state={state.pathologicalStaging}
          setState={setField("pathologicalStaging")}
        />

        {/* FIXME: update index */}
        <AdditionalRemarks
          index={1}
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

const InputSpecimen = ({
  state,
  setState,
}: {
  state: Specimen;
  setState: (state: Specimen) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Select
        label="Specimen laterality"
        options={LATERALITY_OPTIONS}
        value={state.laterality}
        onChange={setField("laterality")}
      />

      {/* FIXME: consider renaming to "technique" or something like this */}
      <Select
        label="Specimen(s) submitted"
        options={TECHNIQUE_OPTIONS}
        value={state.technique.value}
        onChange={(value) =>
          setField("technique")({ ...state.technique, value })
        }
      />
      {state.technique.value === "other" ? (
        <InputTextArea
          lineCount={LINE_COUNT}
          placeholder="FIXME: add placeholder"
          value={state.technique.details}
          onChange={(value) =>
            setField("technique")({ ...state.technique, details: value })
          }
        />
      ) : undefined}

      <Select
        label="Lymph nodes"
        options={LYMPH_NODE_OPTIONS}
        value={state.lymphNodes.value}
        onChange={(value) =>
          setField("lymphNodes")({ ...state.lymphNodes, value })
        }
      />
      {state.lymphNodes.value === "submitted" ? (
        <InputTextArea
          lineCount={LINE_COUNT}
          placeholder="FIXME: add placeholder"
          value={state.lymphNodes.details}
          onChange={(value) =>
            setField("lymphNodes")({ ...state.lymphNodes, details: value })
          }
        />
      ) : undefined}

      <Select
        label="Specimen orientation"
        options={ORIENTATION_OPTIONS}
        value={state.orientation.value}
        onChange={(value) =>
          setField("orientation")({ ...state.orientation, value })
        }
      />
      {state.orientation.value === "specified" ? (
        <InputTextArea
          lineCount={LINE_COUNT}
          placeholder="FIXME: add placeholder"
          value={state.orientation.details}
          onChange={(value) =>
            setField("orientation")({ ...state.orientation, details: value })
          }
        />
      ) : undefined}
    </>
  );
};

const InputPrimaryLesion = ({
  state,
  setState,
}: {
  state: PrimaryLesion;
  setState: (state: PrimaryLesion) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <InputTextArea
        lineCount={LINE_COUNT}
        label="Macroscopic primary lesion description"
        placeholder="FIXME: add placeholder"
        value={state.description}
        onChange={setField("description")}
      />

      <Select
        label="Macroscopic primary lesion dimensions"
        options={DIMENSIONS_OPTIONS}
        value={state.dimensions.value}
        onChange={(value) =>
          setField("dimensions")({ ...state.dimensions, value })
        }
      />

      {state.dimensions.value === "unspecified" ? undefined : (
        <Stack direction="row" alignItems="center" spacing="md">
          <InputNumber
            label="Length"
            unit="mm"
            value={state.dimensions.length}
            onChange={(value) =>
              setField("dimensions")({ ...state.dimensions, length: value })
            }
          />
          x{" "}
          <InputNumber
            label="Width"
            unit="mm"
            value={state.dimensions.width}
            onChange={(value) =>
              setField("dimensions")({ ...state.dimensions, width: value })
            }
          />
          {state.dimensions.value === "specified-with-depth" ? (
            <>
              x{" "}
              <InputNumber
                label="Depth"
                unit="mm"
                value={state.dimensions.depth}
                onChange={(value) =>
                  setField("dimensions")({ ...state.dimensions, depth: value })
                }
              />
            </>
          ) : undefined}
        </Stack>
      )}
    </>
  );
};

const InputLymphNodesStatus = ({
  state,
  setState,
}: {
  state: LymphNodesStatus;
  setState: (state: LymphNodesStatus) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Title title="Sentinel nodes" />
      <NodeStatus
        state={state.sentinelNodes}
        setState={(value) =>
          setField("sentinelNodes")({ ...state.sentinelNodes, ...value })
        }
      />
      <Select
        label="Location of largest metastases"
        options={METASTASIS_LOCATION_OPTIONS}
        value={state.sentinelNodes.largestMetastasisLocation}
        onChange={(value) =>
          setField("sentinelNodes")({
            ...state.sentinelNodes,
            largestMetastasisLocation: value,
          })
        }
      />
      <Title title="Non-sentinel lymph nodes" />
      <NodeStatus
        state={state.nonSentinelLymphNodes}
        setState={setField("nonSentinelLymphNodes")}
      />
      <Title title="Clinically apparent lymph nodes" />
      <NodeStatus
        state={state.clinicallyApparentLymphNodes}
        setState={setField("clinicallyApparentLymphNodes")}
      />
    </>
  );
};

const NodeStatus = ({
  state,
  setState,
}: {
  state: LymphNodesStatusByType;
  setState: (state: LymphNodesStatusByType) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      {/* FIXME: clarify behavior for "Number cannot be determined" */}
      <InputNumber
        label="Number of nodes examined"
        value={state.count}
        onChange={setField("count")}
      />
      <InputNumber
        label="Number of positive nodes"
        value={state.positiveCount}
        onChange={setField("positiveCount")}
      />
      <SelectTroolean
        label="Extranodal extension"
        value={state.extranodalExtension}
        onChange={setField("extranodalExtension")}
      />
      <InputNumber
        label="Maximum dimension of largest metastasis in a node"
        unit="mm"
        value={state.maximumDimension}
        onChange={setField("maximumDimension")}
      />
    </>
  );
};

const InputAncillaryStudies = ({
  state,
  setState,
}: {
  state: AncillaryStudies;
  setState: (state: AncillaryStudies) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Title title="Ancillary studies" />
      <Stack spacing="lg">
        <InputBrafTesting
          state={state.brafTesting}
          setState={setField("brafTesting")}
        />
        <InputOtherTesting tests={state.others} onChange={setField("others")} />
      </Stack>
    </>
  );
};

const InputBrafTesting = ({
  state,
  setState,
}: {
  state: AncillaryStudies["brafTesting"];
  setState: (state: AncillaryStudies["brafTesting"]) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <NestedItem depth={1}>
      <Title title="BRAF testing" />
      <SelectBoolean
        label="Was BRAF testing performed?"
        value={state.hasBeenPerformed}
        onChange={setField("hasBeenPerformed")}
      />
      {state.hasBeenPerformed ? (
        <>
          <InputTextArea
            lineCount={LINE_COUNT}
            label="Results"
            value={state.results}
            onChange={setField("results")}
          />
          <InputTextArea
            lineCount={LINE_COUNT}
            label="Methodology"
            value={state.methodology}
            onChange={setField("methodology")}
          />
        </>
      ) : undefined}
    </NestedItem>
  );
};

const InputOtherTesting = ({
  tests,
  onChange,
}: {
  tests: Test[];
  onChange: (values: Test[]) => void;
}) => {
  return (
    <NestedItem depth={1}>
      <Title title="Other testing" />
      {tests.map((test, index) => (
        <TestingRow
          key={index}
          test={test}
          onChange={(value) => onChange(patchArray(tests, index, () => value))}
        />
      ))}
      {/* FIXME: check alignment (ensure consistency with other forms) */}
      <Button
        label="Ajouter un autre test"
        onClick={() => onChange([...tests, anEmptyTest()])}
      />
    </NestedItem>
  );
};

const TestingRow = ({
  test,
  onChange,
}: {
  test: Test;
  onChange: (value: Test) => void;
}) => {
  const setField = patchState(test, onChange);

  return (
    <Stack direction="row" spacing="md">
      <InputText
        label="Test name"
        value={test.name}
        onChange={setField("name")}
      />
      <InputText
        label="Result"
        value={test.result}
        onChange={setField("result")}
      />
    </Stack>
  );
};

const InputPathologicalStaging = ({
  state,
  setState,
}: {
  state: PathologicalStaging;
  setState: (state: PathologicalStaging) => void;
}) => {
  const setField = patchState(state, setState);

  return (
    <>
      <Title title="Pathological staging" />
      <CheckboxList
        title="TNM descriptors"
        options={TNM_DESCRIPTOR_OPTIONS}
        values={state.tnmDescriptors}
        onChange={setField("tnmDescriptors")}
      />
      <Select
        label="Primary tumor (pT)"
        options={PT_GROUPS}
        value={state.pt}
        onChange={setField("pt")}
      />
      <Select
        label="Primary tumor (pT)"
        options={PN_GROUPS}
        value={state.pn}
        onChange={setField("pn")}
      />
    </>
  );
};
