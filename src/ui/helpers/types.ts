export type ValueOf<T> = T[keyof T];

export type Flatten<T> = {
  [K in keyof T]: T[K] extends readonly (infer Item)[] ? Item : never;
};
