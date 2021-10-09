import { RegionType } from "./symbol";

export interface IIexCompany {
  symbol: string;
  companyName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  CEO: string;
  securityName: string;
  issueType: string;
  sector: string;
  primarySicCode: number;
  employees: number;
  tags: Array<string>;
  address: string;
  address2: string | null;
  state: string;
  city: string;
  zip: string;
  country: RegionType;
  phone: string;
}
