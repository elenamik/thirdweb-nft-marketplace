import type { NextPage } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { useQuery } from "react-query";

import * as React from "react";
import {
  AuctionListing,
  DirectListing,
} from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { MarketPlaceContractAddress } from "../config/contractAddresses";
import { targetChain } from "../config/targetChain";
import NftCard from "../components/NftCard";
import NFTInfo from "../components/NFTInfo";
import { formatDisplayAddress, hexToETH } from "../web3utils";
import { useRouter } from "next/router";

/***
 * TODOS:
 * // can get desiredChainID from the context? rn its hardcoded wrong in index.tsx
 * // direct imports
 */

const Home: NextPage = () => {
  const sdk = new ThirdwebSDK(targetChain);

  const marketplaceContract = sdk.getMarketplace(
    MarketPlaceContractAddress[targetChain]
  );
  const router = useRouter();

  const activeListingsQueryState = useQuery<(AuctionListing | DirectListing)[]>(
    {
      queryFn: () => {
        return marketplaceContract.getActiveListings();
      },
    }
  );

  if (activeListingsQueryState.isLoading) {
    return <div className="large-text">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {activeListingsQueryState.data?.map(
        (listing: AuctionListing | DirectListing) => {
          return (
            <>
              <NftCard image={listing.asset.image} key={listing.id}>
                <NFTInfo
                  id={listing.id}
                  description={listing.asset.description}
                  title={listing.asset.name}
                  address={listing.assetContractAddress}
                />
                <div
                  id="sell-data"
                  className="flex flex-row justify-between pt-2"
                >
                  <div className="text-left ">
                    <span className="font-bold">Listing Price: </span>
                    {`${hexToETH(listing.buyoutPrice)} ⧫`}
                  </div>
                  <div className="text-left ">
                    <span className="font-bold">Seller: </span>
                    <a
                      target="_blank"
                      className="text-blue-700"
                      href={`https://etherscan.io/token/${listing.sellerAddress}`}
                      rel="noreferrer"
                    >
                      {formatDisplayAddress(listing.sellerAddress)}
                    </a>
                  </div>
                </div>
                <div
                  id="buy-button"
                  onClick={() => {
                    router.push(`/listing/${listing.id}`);
                  }}
                  className="primary-button w-100"
                >
                  Buy for {hexToETH(listing.buyoutPrice)} ⧫
                </div>
              </NftCard>
            </>
          );
        }
      )}
    </div>
  );
};

export default Home;
