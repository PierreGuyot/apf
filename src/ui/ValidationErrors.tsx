import { Item } from "./Item";
import css from "./validation-errors.module.css";

type Props = {
  header: string;
  errors: string[];
};

export const ValidationErrors = ({ header, errors }: Props) => {
  if (!errors.length) {
    return undefined;
  }

  return (
    <Item>
      <div className={css.main}>
        <div>{header}</div>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </div>
    </Item>
  );
};
