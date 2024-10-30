import { Button, Line, Stack } from "../ui";

export type Mode = "standard" | "expert";

type Props = { onPick: (mode: Mode) => void };

export const ModePicker = ({ onPick }: Props) => {
  // FIXME: fix scrolling
  // TODO CLEAN: make ModePicker generic (should take a list of modes)

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
