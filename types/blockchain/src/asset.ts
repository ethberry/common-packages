import type { TokenType } from "./token";

export interface IAssetComponentDto {
  id?: number;
  tokenType: TokenType;
  contractId: number;
  templateId: number | null;
  tokenId?: number | null;
  amount: string;
}

export interface IAssetDto {
  components: Array<IAssetComponentDto>;
}
