import { ChainId } from "@thirdweb-dev/sdk";
import { targetChainId } from "./targetChainId";

const ADDRESSES = {
  [ChainId.Goerli]: {
    Marketplace: "0x14f3d32B90Ede9922Fd7EE4FDfD3AabbEA423aD0",
  },
};

export const getContractAddress = (name: string) => {
  return ADDRESSES[targetChainId][name];
};
