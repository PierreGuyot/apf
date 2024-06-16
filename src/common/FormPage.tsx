import { PropsWithChildren } from "react";
import { FormBanner } from "./FormBanner";
import { Page } from "../ui/Page";
import { FORMS, FormId } from "../ui/helpers/forms";

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
