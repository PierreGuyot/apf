import { Button } from "../ui/Button";
import { Line } from "../ui/Line";
import { Stack } from "../ui/Stack";

type Mode = "standard" | "expert";

type Props = { onPick: (mode: Mode) => void };

export const ModePicker = ({ onPick }: Props) => {
  return (
    <Stack spacing="sm">
      <Line>Choisissez un mode pour le formulaire :</Line>
      <Stack spacing="sm">
        <Button label="Standard" onClick={() => onPick("standard")} />
        <Button label="Expert" onClick={() => onPick("expert")} />
      </Stack>
    </Stack>
  );
};
