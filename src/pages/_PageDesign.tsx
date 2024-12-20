import { PropsWithChildren, useState } from "react";

// TODO clean: add @ui alias for design system
// TODO clean: re-order entries

import {
  aMessage,
  Banner,
  Button,
  Checkbox,
  CheckboxList,
  Column,
  DICTIONARY_EN,
  Disclaimer,
  ErrorMessage,
  HelpIcon,
  InlineCode,
  InputNumber,
  InputText,
  InputTextArea,
  Label,
  Language,
  Option,
  OptionGroup,
  Page,
  Pill,
  Select,
  SelectBoolean,
  SelectComposition,
  SelectList,
  SelectNumber,
  SelectPresence,
  SelectTroolean,
  size,
  Size,
  SIZES,
  Stack,
  Summary,
  Table,
  Text,
  TextBlock,
  Title,
  Tooltip,
  Troolean,
  ValidationErrors,
} from "../ui";
import { validateComposition } from "../ui/select-composition.validation";

// Fixtures

const noop = () => {};

type Value =
  | "option-a"
  | "option-b"
  | "option-c"
  | "option-d"
  | "option-e"
  | "option-f";

const MOCK_OPTIONS: Option<Value>[] = [
  { value: "option-a", label: "Option A" },
  { value: "option-b", label: "Option B" },
  { value: "option-c", label: "Option C" },
];

const MOCK_GROUPS: OptionGroup<Value>[] = [
  {
    title: "Group 1",
    options: [
      { value: "option-a", label: "Option A" },
      { value: "option-b", label: "Option B" },
      { value: "option-c", label: "Option C" },
    ],
  },
  {
    title: "Group 2",
    options: [
      { value: "option-d", label: "Option D" },
      { value: "option-e", label: "Option E" },
      { value: "option-f", label: "Option F" },
    ],
  },
];

const MOCK_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const MOCK_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum ultricies est, sit amet fermentum nunc gravida interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vitae interdum risus. Aliquam nibh dolor, venenatis sed tellus in, accumsan aliquet massa. Integer accumsan accumsan tortor, et pretium urna egestas in. In lectus est, maximus a neque ornare, egestas ultrices ipsum.";

export const DesignPage = () => {
  return (
    <Page title="Design system">
      <Stack spacing="lg" maxWidth="850px">
        <EntryConstants />

        {/* Inputs */}
        <EntryCheckbox />
        <EntryCheckboxList />
        <EntryInputText />
        <EntryInputNumber />
        <EntryInputTextArea />
        <EntrySelect />
        <EntrySelectList />
        <EntrySelectNumber />
        <EntrySelectBoolean />
        <EntrySelectTroolean />
        <EntrySelectPresence />
        <EntrySelectComposition />

        <EntryBanner />
        <EntryButton />
        <EntryCode />
        <EntryDisclaimer />
        <EntryErrorMessage />
        <EntryHelpIcon />
        <EntryLabel />
        <EntryPage />
        <EntryPill />
        <EntrySummary />
        <EntryTable />
        <EntryTextBlock />
        <EntryTooltip />
        <EntryValidationErrors />
        <EntryText />
        <EntryTitle />

        {/* TODO clean: add a layout section using:
         *   - Item
         *   - Line
         *   - NestedItem
         *   - Section
         *   - SubSection
         *   - Stack
         */}

        <EntryTranslation />
      </Stack>
    </Page>
  );
};

const COLOR_NAMES = [
  {
    name: "Backgrounds",
    items: [
      { name: "--background-default", hasBorder: true },
      { name: "--background-secondary" },
      { name: "--background-warning" },
      { name: "--background-interaction" },
      { name: "--background-read-only" },
      { name: "--background-disabled" },
      { name: "--background-info", isKnockout: true },
    ],
  },
  {
    name: "Borders",
    items: [
      { name: "--border-default", isKnockout: true },
      { name: "--border-secondary" },
      { name: "--border-warning" },
      { name: "--border-interaction" },
      { name: "--border-read-only", isKnockout: true },
    ],
  },

  {
    name: "Texts",
    items: [
      { name: "--text-secondary", isKnockout: true },
      { name: "--text-knockout", hasBorder: true },
      { name: "--text-warning" },
      { name: "--text-interaction" },
    ],
  },
];

const ColorSquare = ({
  color,
  isKnockout = false,
  hasBorder = false,
}: {
  color: string;
  isKnockout?: boolean;
  hasBorder?: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: `var(${color})`,
        width: "200px",
        padding: `${size("sm")} ${size("md")}`,
        color: isKnockout ? "var(--text-knockout)" : "var(--text-default)",
        border: "1px solid transparent",
        borderColor: hasBorder ? "var(--border-secondary)" : "transparent",
      }}
    >
      {color}
    </div>
  );
};

const SizeSquare = ({ size: _size }: { size: Size }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "30px" }}>
        <Text size="sm" color="secondary">
          {_size}
        </Text>
      </div>
      <div
        style={{
          backgroundColor: "palegoldenrod",
          height: size(_size),
          width: size(_size),
        }}
      />
    </div>
  );
};

const EntryConstants = () => {
  return (
    <DocumentationEntry name="CSS constants">
      <Stack spacing="lg">
        <div>
          All CSS constants can be picked from{" "}
          <InlineCode>constants.css</InlineCode>.
        </div>

        <div>
          <Title title="Colors (semantic)" />
          <Stack direction="row" spacing="md">
            {COLOR_NAMES.map((section) => (
              <div key={section.name}>
                <Label label={section.name} placement="above" />
                {section.items.map(({ name, isKnockout, hasBorder }) => (
                  <ColorSquare
                    key={name}
                    color={name}
                    isKnockout={isKnockout}
                    hasBorder={hasBorder}
                  />
                ))}
              </div>
            ))}
          </Stack>
        </div>

        <div>
          <Title title="Sizes" />
          <Stack spacing="sm">
            {SIZES.map((size) => (
              <SizeSquare key={size} size={size} />
            ))}
          </Stack>
        </div>
      </Stack>
    </DocumentationEntry>
  );
};

const EntryCheckbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <DocumentationEntry name="Checkbox">
      <Checkbox
        label="An example checkbox"
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </DocumentationEntry>
  );
};

const EntryCheckboxList = () => {
  const [values, setValues] = useState<Value[]>([]);

  return (
    <DocumentationEntry name="CheckboxList">
      <CheckboxList
        title="An optional title for the list"
        options={MOCK_OPTIONS}
        values={values}
        onChange={setValues}
      />
    </DocumentationEntry>
  );
};

const EntryInputText = () => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  return (
    <DocumentationEntry name="InputText">
      <InputText label="An example input" value={value1} onChange={setValue1} />
      <InputText
        isFullWidth
        label="A full-width input"
        value={value2}
        onChange={setValue2}
      />
      <InputText
        label="An input text menu with a small label"
        labelSize="sm"
        value={value2}
        onChange={setValue2}
      />
      {/* TODO clean: fix style */}
      <InputText
        isReadOnly
        label="A read-only input"
        value={"A read-only value"}
        onChange={noop}
      />
    </DocumentationEntry>
  );
};

const EntryInputNumber = () => {
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  return (
    <DocumentationEntry name="InputNumber">
      <InputNumber
        label="An example input"
        value={value1}
        onChange={setValue1}
      />
      <InputNumber
        label="A large input"
        size="lg"
        value={value2}
        onChange={setValue2}
      />
      <InputNumber
        label="A read-only input"
        isReadOnly
        value={0}
        onChange={noop}
      />
    </DocumentationEntry>
  );
};

const EntryInputTextArea = () => {
  const [value, setValue] = useState<string>("");

  return (
    <DocumentationEntry name="InputTextArea">
      <InputTextArea
        label="An example text area"
        value={value}
        onChange={setValue}
      />
      <InputTextArea
        label="A read-only text area"
        isReadOnly
        value={aMessage()}
        onChange={noop}
      />
    </DocumentationEntry>
  );
};

const EntrySelect = () => {
  const [value1, setValue1] = useState<Value>("option-a");
  const [value2, setValue2] = useState<Value>("option-a");
  const [value3, setValue3] = useState<Value>("option-a");
  const [value4, setValue4] = useState<Value>("option-a");

  return (
    <DocumentationEntry name="Select">
      <Select
        label="An example dropdown menu"
        options={MOCK_OPTIONS}
        value={value1}
        onChange={setValue1}
      />
      <Select
        label="A dropdown menu with a small label"
        labelSize="sm"
        options={MOCK_OPTIONS}
        value={value2}
        onChange={setValue2}
      />
      <Select
        label="A dropdown menu with the ui variant (not a field)"
        labelSize="sm"
        options={MOCK_OPTIONS}
        value={value3}
        onChange={setValue3}
      />
      <Select
        label="A dropdown menu with grouped options"
        options={MOCK_GROUPS}
        value={value4}
        onChange={setValue4}
      />
      <Select
        label="A read-only dropdown menu"
        options={MOCK_OPTIONS}
        isReadOnly
        value={"option-a"}
        onChange={noop}
      />
    </DocumentationEntry>
  );
};

const EntrySelectList = () => {
  const [values1, setValues1] = useState<Value[]>([]);
  const [values2, setValues2] = useState<Value[]>([]);
  const [values3, setValues3] = useState<Value[]>([]);

  return (
    <DocumentationEntry name="SelectList">
      <SelectList
        label="An example list selection"
        groups={MOCK_GROUPS}
        values={values1}
        onChange={setValues1}
      />
      <SelectList
        groups={MOCK_GROUPS}
        label="A list selection with an empty state"
        emptyState="An example empty state"
        values={values2}
        onChange={setValues2}
      />
      <div>
        <SelectList
          label="A list selection with custom items"
          hasList={false}
          groups={MOCK_GROUPS}
          values={values3}
          onChange={setValues3}
        />
        <ul>
          {values3.map((value) => (
            <li>{value}</li>
          ))}
        </ul>
      </div>
      <SelectList
        groups={MOCK_GROUPS}
        label="A read-only list selection"
        isReadOnly
        values={["option-e", "option-d", "option-a"]}
        onChange={noop}
      />
    </DocumentationEntry>
  );
};

const EntrySelectNumber = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <DocumentationEntry name="SelectNumber">
      <div>
        The <InlineCode>max</InlineCode> prop is mandatory by design.
      </div>
      <SelectNumber
        label="An example number selection"
        max={5}
        value={value}
        onChange={setValue}
      />
      <SelectNumber
        isReadOnly
        label="A read-only number selection"
        max={5}
        value={3}
        onChange={setValue}
      />
    </DocumentationEntry>
  );
};

const EntrySelectBoolean = () => {
  const [value, setValue] = useState<boolean>(false);

  return (
    <DocumentationEntry name="SelectBoolean">
      <SelectBoolean
        label="An example boolean selection"
        value={value}
        onChange={setValue}
      />
    </DocumentationEntry>
  );
};

const EntrySelectTroolean = () => {
  const [value, onChange] = useState<Troolean>("yes");

  return (
    <DocumentationEntry name="SelectTroolean">
      <SelectTroolean
        label="An example troolean selection (yes, no, or unspecified)"
        value={value}
        onChange={onChange}
      />
    </DocumentationEntry>
  );
};

const EntrySelectPresence = () => {
  const [value, onChange] = useState<boolean>(false);

  return (
    <DocumentationEntry name="SelectPresence">
      <SelectPresence
        grammaticalForm={{ gender: "feminine", number: "singular" }}
        label="An example presence selection"
        value={value}
        onChange={onChange}
      />
    </DocumentationEntry>
  );
};

const COMPOSITION_ITEMS = [
  { label: "Composant 1", value: "component-1" },
  { label: "Composant 2", value: "component-2" },
  { label: "Composant 3", value: "component-3" },
];

const EntrySelectComposition = () => {
  const [composition, setComposition] = useState<
    Partial<Record<string, number>>
  >({});
  const error = validateComposition(composition);

  return (
    <DocumentationEntry name="SelectComposition">
      <SelectComposition
        items={COMPOSITION_ITEMS}
        value={composition}
        onChange={setComposition}
        error={error}
      />
    </DocumentationEntry>
  );
};

const EntryBanner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <DocumentationEntry name="Banner">
      <Button label="Toggle banner" onClick={() => setIsVisible(!isVisible)} />
      {isVisible ? (
        <Banner
          left={
            <div>
              <div>
                <b>Left</b> content goes here.
              </div>
              <div>
                Content can be <b>formatted</b>.
              </div>
            </div>
          }
          right={
            <div>
              <div>
                <b>Right</b> content goes here.
              </div>
              <div>
                Content can be <b>formatted</b>.
              </div>
            </div>
          }
        />
      ) : undefined}
    </DocumentationEntry>
  );
};

const EntryButton = () => {
  return (
    <DocumentationEntry name="Button">
      <Button label="An example button" onClick={noop} />
    </DocumentationEntry>
  );
};

const EntryCode = () => {
  return (
    <DocumentationEntry name="Code">
      <div>
        <InlineCode>Some inline code</InlineCode> (useful for formatting units,
        for example).
      </div>
    </DocumentationEntry>
  );
};

const EntryDisclaimer = () => {
  return (
    <DocumentationEntry name="Disclaimer">
      <Disclaimer>
        Content goes here. It can be <b>formatted</b>.
      </Disclaimer>
    </DocumentationEntry>
  );
};

const EntryErrorMessage = () => {
  return (
    <DocumentationEntry name="ErrorMessage">
      <ErrorMessage errorMessage="An example error message" />
    </DocumentationEntry>
  );
};

const EntryHelpIcon = () => {
  const CONTENT = (
    <>
      <div>Content of the tooltip goes here.</div>
      <div>
        It can be <b>formatted</b>.
      </div>
    </>
  );

  return (
    <DocumentationEntry name="HelpIcon">
      <HelpIcon size="sm" content={CONTENT} />
      <HelpIcon content={CONTENT} />
    </DocumentationEntry>
  );
};

const EntryLabel = () => {
  return (
    <DocumentationEntry name="Label">
      {/* TODO clean: extract these styles (see InputText) */}
      <Stack direction="row" alignItems="center" spacing="sm">
        <Label label="An inline label" />
        <div
          style={{
            backgroundColor: "palegoldenrod",
            height: "40px",
            width: "200px",
          }}
        />
      </Stack>

      <div>
        <Label label="A label" placement="above" />
        <div
          style={{
            backgroundColor: "palegoldenrod",
            height: "40px",
            width: "200px",
          }}
        />
      </div>
    </DocumentationEntry>
  );
};

const EntryPage = () => {
  return (
    <DocumentationEntry name="Page">
      <Todo />
    </DocumentationEntry>
  );
};

const EntryPill = () => {
  return (
    <DocumentationEntry name="Pill">
      <Pill label="An example pill" />
      <Pill label="An example pill with a long text" />
    </DocumentationEntry>
  );
};

const EntrySummary = () => {
  return (
    <DocumentationEntry name="Summary">
      <Summary
        getContent={(language) => {
          if (language === "EN") {
            return "Content is customizable per language.";
          }

          return "Le contenu du résumé peut être généré pour chaque langue.";
        }}
      />
    </DocumentationEntry>
  );
};

type Row = {
  index: number;
  type: string;
  location: string;
  others: string;
};

const MOCK_COLUMNS: Column<Row>[] = [
  {
    label: "Index",
    key: "index",
    render: (row) => <div>{row.index + 1}</div>,
  },
  {
    label: "Type",
    key: "type",
    render: (row, _isReadOnly, _onChange) => <div>{row.type}</div>,
    alignment: "left",
    total: () => {
      return <div>Total 1</div>;
    },
  },
  {
    label: "Location",
    key: "location",
    render: (row, _isReadOnly, _onChange) => <div>{row.location}</div>,
    total: () => {
      return <div>Total 2</div>;
    },
  },

  {
    label: "Others",
    key: "others",
    alignment: "left",
    render: (row, _isReadOnly, _onChange) => <div>{row.others}</div>,
  },
];

const MOCK_ROWS = [
  { type: "type-a", location: "location-a", others: "N/A" },
  { type: "type-b", location: "location-b", others: "N/A" },
  { type: "type-c", location: "location-c", others: "Some note" },
  { type: "type-d", location: "location-d", others: "N/A" },
  { type: "type-e", location: "location-e", others: "N/A" },
  { type: "type-f", location: "location-f", others: "Some other note" },
].map((row, index) => ({ ...row, index }));

const Header = () => {
  return (
    <tr>
      <th scope="col">Index</th>
      <th scope="col">Type</th>
      <th scope="col">Location</th>
      <th scope="col">Others</th>
    </tr>
  );
};

const EntryTable = () => {
  // TODO clean: complete example by making these values customizable
  const visibleRowCount = 3;
  const isReadOnly = false;
  const onChange = noop;

  return (
    <DocumentationEntry name="Table">
      <Table
        columns={MOCK_COLUMNS}
        visibleRowCount={visibleRowCount}
        rows={MOCK_ROWS}
        header={Header}
        hasFooter={true}
        isReadOnly={isReadOnly}
        onChange={onChange}
      />
    </DocumentationEntry>
  );
};

const EntryTextBlock = () => {
  return (
    <DocumentationEntry name="TextBlock">
      <TextBlock>{MOCK_PARAGRAPH}</TextBlock>
    </DocumentationEntry>
  );
};

const EntryTooltip = () => {
  return (
    <DocumentationEntry name="Tooltip">
      <Tooltip content="Content goes here" mode="hover">
        <Target>Hover to display tooltip</Target>
      </Tooltip>
      <Tooltip content="Content goes here" mode="click">
        <Target>Click to display tooltip</Target>
      </Tooltip>
    </DocumentationEntry>
  );
};

const EntryValidationErrors = () => {
  return (
    <DocumentationEntry name="ValidationErrors">
      <ValidationErrors
        header="The input data is invalid:"
        errors={["An error.", "Another error.", "Yet another error."]}
      />
    </DocumentationEntry>
  );
};

const EntryTitle = () => {
  return (
    <DocumentationEntry name="Title">
      <Title title="An example title (md)" size="md" />
      <Title title="An example title (lg)" size="lg" />
      <Title title="An example title (xl)" size="xl" />
      <Title title="An example title with an index" index={3} />
      <div>
        Bottom margin can be removed using the{" "}
        <InlineCode>hasMarginBottom</InlineCode> prop:
      </div>
      <Title
        title="An example title with no bottom margin"
        hasMarginBottom={false}
      />
    </DocumentationEntry>
  );
};

const EntryText = () => {
  return (
    <DocumentationEntry name="Text">
      <Text as="div">{MOCK_SENTENCE}</Text>
      <Text as="div" size="sm">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" color="warning">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" size="sm" color="warning">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" variant="bold">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" size="sm" variant="bold">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" color="warning" variant="bold">
        {MOCK_SENTENCE}
      </Text>
      <Text as="div" size="sm" color="warning" variant="bold">
        {MOCK_SENTENCE}
      </Text>
    </DocumentationEntry>
  );
};

const EntryTranslation = () => {
  type Row = Record<Language, string>;
  const rows: Row[] = Object.keys(DICTIONARY_EN)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((key) => ({ FR: key, EN: DICTIONARY_EN[key] }));

  const Item = ({ value }: { value: string }) => {
    // We add a visual warning for missing translations
    const isTodo = value.toLowerCase().includes("todo");
    return (
      <div
        style={
          isTodo
            ? { backgroundColor: "red", color: "var(--text-knockout)" }
            : undefined
        }
      >
        <Text>{value}</Text>
      </div>
    );
  };

  const COLUMNS: Column<Row>[] = [
    {
      label: "FR",
      key: "FR",
      alignment: "left",
      render: (row) => <Item value={row.FR} />,
    },
    {
      label: "EN",
      key: "EN",
      alignment: "left",
      render: (row) => <Item value={row.EN} />,
    },
  ];

  return (
    <DocumentationEntry name="Translation">
      <div>
        <Table columns={COLUMNS} rows={rows} onChange={noop} />
      </div>
    </DocumentationEntry>
  );
};

// Building blocks

const Separator = () => (
  <div
    style={{ width: "100%", borderTop: "1px solid var(--border-secondary)" }}
  />
);

const DocumentationEntry = ({
  name,
  children,
}: PropsWithChildren<{
  name: string;
}>) => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing="md" marginBottom="md">
        <Title size="lg" title={name} hasMarginBottom={false} />
        <Separator />
      </Stack>
      <Stack spacing="md">{children}</Stack>
    </div>
  );
};

const Target = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      style={{
        padding: size("md"),
        borderRadius: size("sm"),
        border: "1px solid var(--border-default)",
        cursor: "default",
      }}
    >
      {children}
    </div>
  );
};

const Todo = () => {
  return (
    <Text as="div" color="secondary">
      TODO: add documentation
    </Text>
  );
};
