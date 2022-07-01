import { Network, initializeAlchemy } from "@alch/alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_RINKEBY,
  maxRetries: 10,
};

export const alchemy = initializeAlchemy(settings);
