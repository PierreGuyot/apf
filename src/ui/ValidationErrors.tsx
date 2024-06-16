import { Item } from "./Item";
import "./validation-errors.css";

type Props = {
  header: string;
  errors: string[];
};

export const ValidationErrors = ({ header, errors }: Props) =>
  errors.length ? (
    <Item>
      <div className="validation-errors">
        <div>{header}</div>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </div>
    </Item>
  ) : undefined;
