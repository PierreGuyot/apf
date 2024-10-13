import { Stack } from "./Stack";
import { Text } from "./Text";

type Props = {
  label: string;
  placement?: "above" | "inline";
  size?: "sm" | "md";
  variant?: "thin" | "bold";
};

export const Label = ({
  label,
  placement = "inline",
  variant = "thin",
  size,
}: Props) => (
  <Stack marginBottom={placement === "above" ? "xs" : undefined}>
    <label>
      <Text size={size} variant={variant} shouldWrap={false}>
        {label}
      </Text>
    </label>
  </Stack>
);
