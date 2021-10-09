export enum RegionType {
  AU = "AU",
  BE = "BE",
  CA = "CA",
  CN = "CN",
  DE = "DE",
  ES = "ES",
  FI = "FI",
  FR = "FR",
  GB = "GB",
  GR = "GR",
  HK = "HK",
  ID = "ID",
  IN = "IN",
  IT = "IT",
  JP = "JP",
  KR = "KR",
  MX = "MX",
  NL = "NL",
  PT = "PT",
  SG = "SG",
  TH = "TH",
  TR = "TR",
  TW = "TW",
  US = "US",
  ZA = "ZA",
  null = "null",
}

// https://cloud.iexapis.com/stable/ref-data/exchanges?token=sk_XXX
export enum ExchangeType {
  NYS = "NYS",
  NAS = "NAS",
  // these two should be listed first
  ADS = "ADS",
  AMS = "AMS",
  ASX = "ASX",
  AUSSX = "AUSSX",
  BRU = "BRU",
  CIS = "CIS",
  CNQ = "CNQ",
  CNSGHK = "CNSGHK",
  CNSZHK = "CNSZHK",
  ETR = "ETR",
  HKHKSG = "HKHKSG",
  HKHKSZ = "HKHKSZ",
  HKG = "HKG",
  HEL = "HEL",
  KRKSDQ = "KRKSDQ",
  KRKNX = "KRKNX",
  JPTSE = "JPTSE",
  KRX = "KRX",
  LDN = "LDN",
  LIS = "LIS",
  LON = "LON",
  NEC = "NEC",
  NSE = "NSE",
  PINX = "PINX",
  PAR = "PAR",
  SES = "SES",
  SHE = "SHE",
  SHG = "SHG",
  STU = "STU",
  TSE = "TSE",
  TSX = "TSX",
  TAI = "TAI",
}

export interface IIexSymbol {
  symbol: string;
  exchange: ExchangeType;
  exchangeSuffix: string;
  exchangeName: string;
  name: string;
  date: string;
  type: string;
  iexId: string | null;
  region: RegionType;
  currency: string;
  isEnabled: boolean;
  figi: string | null;
  cik: string | null;
  lei: string | null;
}
