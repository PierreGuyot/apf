import { PropsWithChildren } from "react";
import { FORMS, FormId, Page } from "../ui";
import { FormBanner } from "./FormBanner";

type Props = PropsWithChildren<{
  formId: FormId;
  isPickingMode?: boolean;
  onClear: () => void;
}>;

export const FormPage = ({
  formId,
  isPickingMode = false,
  onClear,
  children,
}: Props) => {
  const form = FORMS[formId];

  return (
    <Page title={form.title} paddingTop={form.isPrototype ? "lg" : "md"}>
      <FormBanner
        formId={formId}
        isPickingMode={isPickingMode}
        isPrototype={form.isPrototype}
        onClear={onClear}
      />
      {children}
    </Page>
  );
};
