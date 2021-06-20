export const getFormattedCurrency = (value: string): number => Number.parseFloat(value) * 100;

export const getNormalCurrency = (value: number): string =>
  value !== void 0 ? (value !== 0 ? value / 100 : 0).toString() : "";
