import { FC } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";

export const NetworkProvider: FC = props => {
  const { children } = props;

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new ethers.providers.Web3Provider(provider);
  };

  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};
