import { ChainId } from "@thirdweb-dev/sdk";

export const targetChainId = ChainId.Goerli;

/***
 * Need to add support for your own network
 */
export const getEtherscanURL = () => {
  if (targetChainId === ChainId.Goerli) {
    return "https://goerli.etherscan.io/";
  } else {
    console.log("Please add etherscan URL for your network");
    return undefined;
  }
};
