import { v4 as uuidv4 } from "uuid";

export const anId = () => uuidv4();

export const sum = (items: number[]): number =>
  items.reduce((acc, item) => acc + item);
