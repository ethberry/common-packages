export const comparator = (key: string) => (a: Record<string, any>, b: Record<string, any>) =>
  a[key] > b[key] ? 1 : -1;

export const arrayComparator = <T extends Record<string, any>>(arr: Array<T>, key = "id") => {
  return arr.slice().sort(comparator(key));
};
