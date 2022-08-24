import { ICmcData } from "./data";

export interface ICmcResponse {
  status: number;
  data: Array<ICmcData>;
}
