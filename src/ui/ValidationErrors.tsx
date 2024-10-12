import { Item } from "./Item";
import { Text } from "./Text";
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
        <Text size="sm" color="warning">
          <div>{header}</div>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </Text>
      </div>
    </Item>
  );
};
