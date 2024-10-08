import { PropsWithChildren, useState } from "react";
import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { CheckboxList } from "../ui/CheckboxList";
import { Disclaimer } from "../ui/Disclaimer";
import { ErrorMessage } from "../ui/ErrorMessage";
import { px } from "../ui/helpers/helpers";
import { Option } from "../ui/helpers/options";
import { HelpIcon } from "../ui/HelpIcon";
import { InlineCode } from "../ui/InlineCode";
import { InputNumber } from "../ui/InputNumber";
import { InputText } from "../ui/InputText";
import { InputTextArea } from "../ui/InputTextArea";
import { Label } from "../ui/Label";
import { Page } from "../ui/Page";
import { Pill } from "../ui/Pill";
import { Select } from "../ui/Select";
import { ItemGroup, SelectList } from "../ui/SelectList";
import { SelectNumber } from "../ui/SelectNumber";
import { Summary } from "../ui/Summary";
import { Column, Table } from "../ui/Table";
import { TextBlock } from "../ui/TextBlock";
import { Title } from "../ui/Title";
import { Tooltip } from "../ui/Tooltip";
import { ValidationErrors } from "../ui/ValidationErrors";
import { YesOrNo } from "../ui/YesOrNo";

// TODO design-system: test readonly cases for inputs
// TODO design-system: handle max width
// TODO design-system: make SelectList button blue

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

const MOCK_GROUPS: ItemGroup<Value>[] = [
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

const MOCK_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum ultricies est, sit amet fermentum nunc gravida interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vitae interdum risus. Aliquam nibh dolor, venenatis sed tellus in, accumsan aliquet massa. Integer accumsan accumsan tortor, et pretium urna egestas in. In lectus est, maximus a neque ornare, egestas ultrices ipsum.";

export const DesignPage = () => {
  return (
    <Page title="Design system">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: px(32),
        }}
      >
        {/* Inputs */}
        <EntryCheckbox />
        <EntryCheckboxList />
        <EntryInputText />
        <EntryInputNumber />
        <EntryInputTextArea />
        <EntrySelect />
        <EntrySelectList />
        <EntrySelectNumber />

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
        <EntryTitle />
        <EntryTooltip />
        <EntryValidationErrors />
        <EntryYesOrNo />
        {/* TODO design-system: add Spacing component */}
        {/* TODO design-system: add Text component */}

        {/* TODO design-system: add a layout section using:
         *   - Item
         *   - Line
         *   - NestedItem
         *   - Section
         *   - SubSection
         */}

        {/* TODO design-system: add translation section */}
      </div>
    </Page>
  );
};

const EntryCheckbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <DocumentationEntry name="Checkbox">
      <Todo />
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
      <Todo />
      <CheckboxList
        language="FR"
        title="An optional title for the list"
        options={MOCK_OPTIONS}
        values={values}
        onChange={setValues}
      />
    </DocumentationEntry>
  );
};

const EntryInputText = () => {
  const [value, setValue] = useState<string>("");

  return (
    <DocumentationEntry name="InputText">
      <Todo />
      <InputText label="An optional label" value={value} onChange={setValue} />
    </DocumentationEntry>
  );
};

const EntryInputNumber = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <DocumentationEntry name="InputNumber">
      <Todo />
      <InputNumber
        label="An optional label"
        value={value}
        onChange={setValue}
      />
    </DocumentationEntry>
  );
};

const EntryInputTextArea = () => {
  const [value, setValue] = useState<string>("");

  return (
    <DocumentationEntry name="InputText">
      <Todo />
      <InputTextArea
        label="An optional label"
        value={value}
        onChange={setValue}
      />
    </DocumentationEntry>
  );
};

const EntrySelect = () => {
  const [value, setValue] = useState<Value>("option-a");

  return (
    <DocumentationEntry name="Select">
      <Todo />
      <Select
        name="Name of the label"
        label="On optional label"
        options={MOCK_OPTIONS}
        value={value}
        onChange={setValue}
      />
      <div>
        The <InlineCode>Select</InlineCode> component can also take grouped
        options:
      </div>
      <Select
        name="Name of the label"
        label="On optional label"
        options={MOCK_GROUPS}
        value={value}
        onChange={setValue}
      />
    </DocumentationEntry>
  );
};

const EntrySelectList = () => {
  const [values, setValues] = useState<Value[]>([]);

  return (
    <DocumentationEntry name="SelectList">
      <Todo />
      <SelectList
        label="An optional label"
        groups={MOCK_GROUPS}
        value={values}
        onChange={setValues}
      />

      <div>The list of selected items can be hidden for customization.</div>
      <SelectList
        label="An optional label"
        hasList={false}
        groups={MOCK_GROUPS}
        value={values}
        onChange={setValues}
      />

      <div>
        The read-only version (controlled by the{" "}
        <InlineCode>isReadOnly</InlineCode> prop) doesn't display its label:
      </div>
      <SelectList
        groups={MOCK_GROUPS}
        isReadOnly
        value={values}
        onChange={setValues}
      />
    </DocumentationEntry>
  );
};

const EntrySelectNumber = () => {
  const [value, onChange] = useState<number>(0);

  return (
    <DocumentationEntry name="SelectNumber">
      <Todo />

      <div>
        The <InlineCode>max</InlineCode> prop is mandatory by design.
      </div>
      <SelectNumber
        name="Name of the label"
        max={5}
        value={value}
        onChange={onChange}
      />
    </DocumentationEntry>
  );
};

const EntryBanner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <DocumentationEntry name="Banner">
      <Todo />
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
      <Todo />
      <Button label="An example button" onClick={noop} />
    </DocumentationEntry>
  );
};

const EntryCode = () => {
  return (
    <DocumentationEntry name="Code">
      <Todo />
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
      <Todo />
      <Disclaimer>
        Content goes here. It can be <b>formatted</b>.
      </Disclaimer>
    </DocumentationEntry>
  );
};

const EntryErrorMessage = () => {
  return (
    <DocumentationEntry name="ErrorMessage">
      <Todo />
      <ErrorMessage errorMessage="An example error message" />
    </DocumentationEntry>
  );
};

const EntryHelpIcon = () => {
  return (
    <DocumentationEntry name="HelpIcon">
      <Todo />
      <HelpIcon
        content={
          <>
            <div>Content of the tooltip goes here.</div>
            <div>
              {" "}
              It can be <b>formatted</b>.
            </div>
          </>
        }
      />
    </DocumentationEntry>
  );
};

const EntryLabel = () => {
  return (
    <DocumentationEntry name="Label">
      <Todo />
      <Label label="A label" />
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
      <Todo />
      <Pill label="An example pill" />
      <Pill label="An example pill with a long text" />
    </DocumentationEntry>
  );
};

const EntrySummary = () => {
  return (
    <DocumentationEntry name="Summary">
      <Todo />
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

const COLUMNS: Column<Row>[] = [
  {
    label: "Index",
    key: "index",
    render: (row) => <div>{row.index + 1}</div>,
  },
  {
    label: "Type",
    key: "type",
    render: (row, _isReadOnly, _onChange) => <div>{row.type}</div>,
  },
  {
    label: "Location",
    key: "location",
    render: (row, _isReadOnly, _onChange) => <div>{row.location}</div>,
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
  // TODO documentation: complete example by making these values customizable
  const visibleRowCount = 3;
  const isReadOnly = false;
  const onChange = noop;

  return (
    <DocumentationEntry name="Table">
      <Todo />

      <Table
        columns={COLUMNS}
        visibleRowCount={visibleRowCount}
        rows={MOCK_ROWS}
        header={Header}
        hasFooter={false}
        isReadOnly={isReadOnly}
        onChange={onChange}
      />
    </DocumentationEntry>
  );
};

const EntryTextBlock = () => {
  return (
    <DocumentationEntry name="TextBlock">
      <Todo />
      <TextBlock>{MOCK_PARAGRAPH}</TextBlock>
    </DocumentationEntry>
  );
};

const EntryTitle = () => {
  return (
    <DocumentationEntry name="Title">
      <Todo />
      <Title title="An example title (sm)" size="sm" />
      <Title title="An example title (md)" size="md" />
      <Title title="An example title (lg)" size="lg" />
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

const EntryTooltip = () => {
  return (
    <DocumentationEntry name="Tooltip">
      <Todo />
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
      <Todo />
      <ValidationErrors
        header="The input data is invalid:"
        errors={["An error.", "Another error.", "Yet another error."]}
      />
    </DocumentationEntry>
  );
};

const EntryYesOrNo = () => {
  return (
    <DocumentationEntry name="YesOrNo">
      <Todo />
      <div>
        FR: <YesOrNo value={true} language="FR" />{" "}
        <YesOrNo value={false} language="FR" />
      </div>
      <div>
        EN: <YesOrNo value={true} language="EN" />{" "}
        <YesOrNo value={false} language="EN" />
      </div>
    </DocumentationEntry>
  );
};

// Building blocks

const Separator = () => (
  <div style={{ width: "100%", borderTop: "1px solid lightgrey" }} />
);

const DocumentationEntry = ({
  name,
  children,
}: PropsWithChildren<{
  name: string;
}>) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: px(16),
          marginBottom: px(16),
        }}
      >
        <Title title={name} hasMarginBottom={false} />
        <Separator />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: px(16) }}>
        {children}
      </div>
    </div>
  );
};

const Todo = () => {
  return <div style={{ color: "grey" }}>TODO: add documentation</div>;
};

const Target = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      style={{
        padding: px(16),
        borderRadius: px(4),
        border: "1px solid lightgrey",
        cursor: "default",
      }}
    >
      {children}
    </div>
  );
};
