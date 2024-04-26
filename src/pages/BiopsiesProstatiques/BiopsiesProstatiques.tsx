import { useState } from "react";
import { InputNumber } from "../../ui/InputNumber";
import { InputText } from "../../ui/InputText";
import { InputTextArea } from "../../ui/InputTextArea";
import { Item } from "../../ui/Item";
import { Line } from "../../ui/Line";
import { Select } from "../../ui/Select";
import { SelectNumber } from "../../ui/SelectNumber";
import { Summary } from "../../ui/Summary";
import { Column, Table } from "../../ui/Table";
import { range } from "../../ui/helpers";
import { aMessage } from "../../ui/mock";
import { YES_NO_OPTIONS } from "../../ui/options";
import { useBoolean, useNumber, useString } from "../../ui/state";

// TODO: extract table to a separate file

const TableHeader = () => (
  <>
    <tr>
      <th scope="col" rowSpan={2} colSpan={3}>
        Sites
      </th>
      <th scope="col" rowSpan={1} colSpan={2}>
        Biopsies
      </th>
      <th scope="col" rowSpan={1} colSpan={6}>
        Tumeur
      </th>
      <th scope="col" rowSpan={2} colSpan={2}>
        Autres lésions
      </th>
    </tr>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Taille</th>
      <th scope="col">Nombre +</th>
      <th scope="col">Taille</th>
      <th scope="col">Gleason</th>
      <th scope="col">EPN</th>
      <th scope="col">TEP</th>
      <th scope="col">PIN</th>
    </tr>
  </>
);

const MAX_TARGET_COUNT = 3;

type PiradsItem = {
  count: number;
  location: string;
};

const aPiradsItem = (): PiradsItem => ({
  count: 0,
  location: "b",
});

// PIRADS: Prostate Imaging Reporting & Data System
const PiradsSelect = ({
  value,
  onChange,
}: {
  value: PiradsItem;
  onChange: (value: PiradsItem) => void;
}) => {
  const onChangeCount = (count: number) => onChange({ ...value, count });
  const onChangeLocation = (location: string) =>
    onChange({ ...value, location });

  return (
    <Line>
      <SelectNumber
        name="PIRADS count" // TODO: check this with Louis
        label="PIRADS"
        min={2}
        max={5}
        value={value.count}
        onChange={onChangeCount}
      />{" "}
      située à <InputText value={value.location} onChange={onChangeLocation} />
    </Line>
  );
};

type Pair = [number, number];

type Row = {
  // TODO: rename the site group
  sites: {
    1: string;
    2: string;
    3: string;
  };

  biopsy: {
    count: number;
    size: Pair;
  };
  tumor: {
    count: number;
    size: Pair;
    gleason: Pair;
    epn: boolean;
    tep: boolean;
    pin: boolean;
  };
  otherLesions: string;
};

const COLUMNS: Column<Row>[] = [
  {
    label: "Site 1",
    key: "site.1",
    render: (value) => <span>{value.sites[1]}</span>,
  },
  {
    label: "Site 2",
    key: "site.2",
    render: (value) => <span>{value.sites[2]}</span>,
  },
  {
    label: "Site 3",
    key: "site.3",
    render: (value) => <span>{value.sites[3]}</span>,
  },
  {
    label: "Biopsy Count",
    key: "biopsy.count",
    render: (row) => <span>{row.biopsy.count}</span>,
  },
  {
    label: "Biopsy Size",
    key: "biopsy.size",
    render: (row) => {
      const [a, b] = row.biopsy.size;
      return (
        <span>
          {a} + {b}
        </span>
      );
    },
  },
  {
    label: "Tumor count",
    key: "tumor.count",
    render: (row) => <span>{row.tumor.count}</span>,
  },
  {
    label: "Tumor size",
    key: "tumor.size",
    render: (row) => {
      const [a, b] = row.tumor.size;
      return (
        <span>
          {a} + {b}
        </span>
      );
    },
  },
  {
    label: "Tumor gleason",
    key: "tumor.gleason",
    render: (row) => {
      const [a, b] = row.tumor.gleason;
      return (
        <span>
          {a + b} ({a} + {b})
        </span>
      );
    },
  },
  {
    label: "Tumor EPN",
    key: "tumor.epn",
    render: (row) => <span>{row.tumor.epn ? "Oui" : "Non"}</span>,
  },
  {
    label: "Tumor TEP",
    key: "tumor.tep",
    render: (row) => <span>{row.tumor.tep ? "Oui" : "Non"}</span>,
  },
  {
    label: "Tumor PIN",
    key: "tumor.pin",
    render: (row) => <span>{row.tumor.pin ? "Oui" : "Non"}</span>,
  },
  {
    label: "Other lesions",
    key: "otherLesions",
    render: (row) => <span>{row.otherLesions ? "Oui" : "Non"}</span>,
  },
];

const anEmptyRow = (): Row => ({
  sites: { 1: "TODO", 2: "TODO", 3: "TODO" },
  biopsy: { count: 2, size: [0, 0] },
  tumor: {
    count: 0,
    size: [0, 0],
    gleason: [0, 0],
    epn: false,
    tep: false,
    pin: false,
  },
  otherLesions: "",
});
const rows = range(6).map(anEmptyRow);
const MOCK_SUMMARY = range(4).map(aMessage).join("\n");

export const BiopsiesProstatiques = () => {
  // State

  const [hasInfo, setHasInfo] = useBoolean();
  const [hasTarget, setHasTarget] = useBoolean();
  const [targetCount, setTargetCount] = useNumber();
  const [piradsItems, setPiradsItems] = useState<PiradsItem[]>(
    range(MAX_TARGET_COUNT).map(aPiradsItem),
  );
  const [hasMri, setHasMri] = useBoolean();
  const [psaRate, setPsaRate] = useNumber(); // Prostatic Specific Antigen
  const [potCount, setPotCount] = useNumber();
  const [comment, setComment] = useString();

  // Callbacks

  const onUpdatePiradsItem = (value: PiradsItem, index: number) => {
    const updatedArray = [...piradsItems];
    updatedArray[index] = value;
    setPiradsItems(updatedArray);
  };

  // Template

  return (
    <div>
      <Line>
        {/* TODO: is this option actually useful? */}
        <Select
          value={hasInfo}
          options={YES_NO_OPTIONS}
          name="Renseignements cliniques"
          label="Avez-vous des renseignements cliniques ?"
          onChange={setHasInfo}
        />
      </Line>
      {hasInfo ? (
        <>
          <Line>
            <InputNumber
              value={psaRate}
              label="Taux de PSA"
              unit="ng-per-mL"
              onChange={setPsaRate}
            />
          </Line>
          <Line>
            <Select
              value={hasMri}
              options={YES_NO_OPTIONS}
              name="IRM"
              label="Avez-vous une IRM ?"
              onChange={setHasMri}
            />
          </Line>
          {hasMri ? (
            <>
              <Line>
                <Select
                  value={hasTarget}
                  options={YES_NO_OPTIONS}
                  name="Présence de cible"
                  label="Avez-vous au moins une cible ?"
                  onChange={setHasTarget}
                />
              </Line>
              {hasTarget ? (
                <>
                  <Line>
                    <SelectNumber
                      value={targetCount}
                      name="Nombre de cibles"
                      label="Nombre de cibles"
                      max={MAX_TARGET_COUNT}
                      onChange={setTargetCount}
                    />
                  </Line>
                  {/* We handle the maximum number of items in all cases and simply hide according to count
                  This way, changing the count doesn't erase user input */}
                  {piradsItems.slice(0, targetCount).map((item, i) => (
                    <Line key={i}>
                      <PiradsSelect
                        value={item}
                        onChange={(value) => onUpdatePiradsItem(value, i)}
                      />
                    </Line>
                  ))}
                </>
              ) : undefined}
            </>
          ) : undefined}

          <Line>
            <InputNumber
              value={potCount}
              label="Combien de pots avez-vous ?"
              onChange={setPotCount}
            />
          </Line>

          <Item>
            <Table columns={COLUMNS} rows={rows} header={TableHeader} />
          </Item>

          <Item>
            <InputTextArea
              value={comment}
              label="Remarques particulières"
              placeholder="Ajoutez vos remarques additionnelles dans ce champ."
              onChange={setComment}
            />
          </Item>

          <Item>
            <Summary content={MOCK_SUMMARY} />
          </Item>
        </>
      ) : undefined}
    </div>
  );
};
