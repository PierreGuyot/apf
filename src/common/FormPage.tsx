import { PropsWithChildren } from "react";
import { FormBanner } from "./FormBanner";
import { Page } from "../ui/Page";
import { FORMS, FormId } from "../ui/helpers/forms";

type Props = PropsWithChildren<{
  formId: FormId;
  onClear: () => void;
}>;

export const FormPage = ({ formId, onClear, children }: Props) => {
  const form = FORMS[formId];

  return (
    <Page title={form.title} paddingTop={form.isPrototype ? "lg" : "md"}>
      <FormBanner
        formId={formId}
        isPrototype={form.isPrototype}
        onClear={onClear}
      />

      {children}
    </Page>
  );
};
