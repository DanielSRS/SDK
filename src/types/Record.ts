export type InvertRecord<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T as T[P]]: P;
};

export type TransformKeysToStrings<T extends Record<number, any>> = {
  [K in keyof T as `${K & number}`]: T[K];
};
