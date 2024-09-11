export const comparator = (key: string) => (a: Record<string, any>, b: Record<string, any>) =>
  a[key] > b[key] ? 1 : -1;
