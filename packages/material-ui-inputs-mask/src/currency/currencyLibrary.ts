export enum SupportedCurrency {
  "IDR" = "IDR",
  "USD" = "USD",
  "YEN" = "YEN",
}

export type ICurrencyLibrary = {
  [key in SupportedCurrency]: ICurrencyProps;
};

export interface ICurrencyProps {
  precision: number;
  symbol: string;
}

export const currencyLibrary: ICurrencyLibrary = {
  [SupportedCurrency.IDR]: {
    precision: 2,
    symbol: "Rp",
  },
  [SupportedCurrency.USD]: {
    precision: 2,
    symbol: "$",
  },
  [SupportedCurrency.YEN]: {
    precision: 0,
    symbol: "¥",
  },
};
