import { IIexPrevious } from "./previous";
import { IIexStats } from "./stats";
import { IIexNews } from "./news";
import { IIexOhlc } from "./ohlc";
import { IIexFinancialsWrapper } from "./financials";
import { IIexQuote } from "./qoute";
import { IIexVolumeByVenue } from "./volume-by-venue";
import { IIexSplit } from "./split";
import { IIexCompany } from "./company";
import { IIexChart } from "./chart";

export enum BatchTypes {
  financials = "financials",
  quote = "quote",
  news = "news",
  chart = "chart",
  ohlc = "ohlc",
  previous = "previous",
  price = "price",
  peers = "peers",
  splits = "splits",
  stats = "stats",
  indicator = "indicator",
  company = "company",
  volumeByVenue = "volume-by-venue",
  delayedQuote = "delayed-quote",
}

export type IIexBatch = {
  [key: string]: {
    [BatchTypes.company]?: IIexCompany;
    [BatchTypes.financials]?: IIexFinancialsWrapper;
    [BatchTypes.ohlc]?: IIexOhlc;
    [BatchTypes.quote]?: IIexQuote;
    [BatchTypes.previous]?: IIexPrevious;
    [BatchTypes.price]?: number;
    [BatchTypes.peers]?: Array<string>;
    [BatchTypes.splits]?: Array<IIexSplit>;
    [BatchTypes.stats]?: IIexStats;
    [BatchTypes.chart]?: Array<IIexChart>;
    [BatchTypes.news]?: Array<IIexNews>;
    [BatchTypes.indicator]?: unknown;
    [BatchTypes.volumeByVenue]?: Array<IIexVolumeByVenue>;
    [BatchTypes.delayedQuote]?: unknown;
  };
};
