export const aMessage = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum orci sed felis varius volutpat. Suspendisse aliquam, libero vitae vehicula pulvinar, neque ex interdum ipsum, vitae tristique lectus lacus eu augue.";

export const aNumber = (): number =>
  Number(String(Math.random()).split(".")[1]);

export const aDigit = () => Number(String(aNumber())[0]);
