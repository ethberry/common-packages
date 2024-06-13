import { ICommonWalletDto } from "./common";

export interface IParticleDto extends ICommonWalletDto {
  displayName?: string;
  email?: string;
  imageUrl?: string;
}
