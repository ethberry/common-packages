export interface ICurrencyInputProps {
  allowNegative?: boolean;
  currencyCode?: string;
  fractionalDelimiter?: string;
  fillByZeros?: string;
  name: string;
  readOnly?: boolean;
  thousandsSeparator?: string;
}

export interface ICurrencyLibrary {
  [key: string]: ICurrencyProps;
}

export interface ICurrencyProps {
  name: string;
  precision: number;
  symbol: string;
}
