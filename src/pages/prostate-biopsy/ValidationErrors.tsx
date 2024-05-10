import "./validation-errors.css";

type Props = { errors: string[] };

// TODO: move to /ui folder
export const ValidationErrors = ({ errors }: Props) =>
  errors.length ? (
    <div className="validation-errors">
      <div>Le tableau comporte les erreurs suivantes :</div>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </div>
  ) : undefined;
