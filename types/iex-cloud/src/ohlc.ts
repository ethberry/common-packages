export interface IIexOhlc {
  open?: {
    price?: number;
    time?: number;
  };
  close?: {
    price?: number;
    time?: number;
  };
  high: number | null;
  low: number | null;
  volume: number | null;
  symbol: string;
}
