import { transform } from "./transform";

export const pick = (obj: Record<string, any>, items: Array<string>) =>
  transform(obj, (_value, key) => items.includes(key));
