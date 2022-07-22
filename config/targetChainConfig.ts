import { ChainId } from "@thirdweb-dev/sdk";
import { initializeAlchemy, Network } from "@alch/alchemy-sdk";

export const targetChainId = ChainId.Goerli;

// /***
//  * Alchemy has different naming conventions, so you need to convert from chain ID to their constant.
//  * A few are defined, but you will need to add yours if it is not below.
//  * @param chainId: as specified in the config from the ChainID's imported from ThirdWeb's SDK
//  */
// export const getAlchemyNetwork = (chainId: ChainId) => {
//   let alchemyTargetNetwork: Network;
//   switch (chainId) {
//     case ChainId.Mainnet:
//       alchemyTargetNetwork = Network.ETH_MAINNET;
//       break;
//
//     case ChainId.Goerli:
//       alchemyTargetNetwork = Network.ETH_GOERLI;
//       break;
//
//     case ChainId.Polygon:
//       alchemyTargetNetwork = Network.MATIC_MAINNET;
//       break;
//
//     case ChainId.Mumbai:
//       alchemyTargetNetwork = Network.MATIC_MUMBAI;
//       break;
//
//     default:
//       throw new Error(
//         "Target Chain configuration is not set up for Alchemy. Please add it here."
//       );
//   }
//   return alchemyTargetNetwork;
// };
//
// const settings = {
//   apiKey: process.env.ALCHEMY_API_KEY,
//   network: getAlchemyNetwork(targetChainId),
//   maxRetries: 10,
// };
//
// export const alchemy = initializeAlchemy(settings);
