import { Button } from "./Button";
import { Title } from "./Title";
import { copyToClipboard } from "./copy";
import "./summary.css";

type SummaryProps = {
  content: string;
};

export const Summary = ({ content }: SummaryProps) => {
  return (
    <>
      <Title title="Compte-rendu" marginBottom="sm" />
      <div className="summary">
        <Button
          className="summary-copy-button"
          label="Copier dans le presse-papier"
          onClick={() => copyToClipboard(content)}
        />
        <pre className="summary-content">{content}</pre>
      </div>
    </>
  );
};
