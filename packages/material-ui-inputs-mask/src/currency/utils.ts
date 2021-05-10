import {currencyLibrary, SupportedCurrency, ICurrencyProps} from "./currencyLibrary";

export const getCurrencyProps = (currencyCode: string): ICurrencyProps => {
  const formattedCurrencyCode = currencyCode.toUpperCase();

  const currencyName: string = SupportedCurrency[<keyof typeof SupportedCurrency>formattedCurrencyCode];
  const currencyProp: any = currencyLibrary[<keyof typeof currencyLibrary>currencyName];

  return (currencyProp as ICurrencyProps) || currencyLibrary[SupportedCurrency.USD];
};

export const getFormattedCurrency = (value: string): number => {
  return Number.parseFloat(value) * 100;
};

export const getNormalCurrency = (value: number): string => {
  return value ? (value / 100).toString() : "";
};
