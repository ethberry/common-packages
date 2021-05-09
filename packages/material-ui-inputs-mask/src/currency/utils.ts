import {ICurrencyProps} from "./interfaces";
import {currencyLibrary} from "./currencyLibrary";

export const getCurrencyProps = (currencyCode: string): ICurrencyProps => {
  const formattedCurrencyCode = currencyCode.toUpperCase();

  const currencyProp = currencyLibrary[formattedCurrencyCode];

  return currencyProp || currencyLibrary.USD;
};

export const getFormattedCurrency = (value: string): number => {
  return Number.parseFloat(value) * 100;
};

export const getNormalCurrency = (value: number): string => {
  return value ? (value / 100).toString() : "";
};

export const doNothing = (): void => {};
