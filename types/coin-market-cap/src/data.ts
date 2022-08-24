import { ICmcQuote } from "./quote";

export interface ICmcData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: Array<string>;
  max_supply: null;
  circulating_supply: number;
  total_supply: number;
  platform: null;
  cmc_rank: number;
  last_updated: string;
  quote: Record<string, ICmcQuote>;
}
