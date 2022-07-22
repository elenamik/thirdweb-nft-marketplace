import { ChainId } from "@thirdweb-dev/sdk";
import { targetChainId } from "./targetChainConfig";

interface IAddresses {
  [key: string]: { [key: string]: string };
}

const ADDRESSES: IAddresses = {
  [ChainId.Goerli]: {
    Marketplace: "0x14f3d32B90Ede9922Fd7EE4FDfD3AabbEA423aD0",
  },
};

console.log(typeof ADDRESSES);
export const readAppContractAddresses = (name: string) => {
  return ADDRESSES[targetChainId][name];
};
