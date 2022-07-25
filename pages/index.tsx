import type { NextPage } from "next";

import * as React from "react";
import {
  AuctionListing,
  DirectListing,
} from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import NftCard from "../components/NftCard";
import NFTInfo from "../components/NFTInfo";
import { formatDisplayAddress, hexToETH } from "../web3utils";
import { useRouter } from "next/router";
import { useActiveListings, useMarketplace } from "@thirdweb-dev/react";
import { readAppContractAddresses } from "../config/contractAddresses";
import { getEtherscanURL } from "../config/targetChainConfig";

/***
 * TODOS:
 * // direct imports
 */

const Home: NextPage = () => {
  const marketplaceAddress = readAppContractAddresses("Marketplace");
  const marketplace = useMarketplace(marketplaceAddress);
  const { data, isLoading } = useActiveListings(marketplace);

  const router = useRouter();

  if (isLoading) {
    return <div className="large-text">Loading...</div>;
  }
  const etherscanURL = getEtherscanURL();

  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((listing: AuctionListing | DirectListing) => {
        return (
          <>
            <NftCard image={listing.asset?.image ?? ""} key={listing.id}>
              <>
                <NFTInfo
                  id={listing.id}
                  description={listing.asset?.description ?? ""}
                  title={listing.asset?.name ?? ""}
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
                      href={`${etherscanURL}/token/${listing.sellerAddress}`}
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
                  className="primary-button"
                >
                  Buy for {hexToETH(listing.buyoutPrice)} ⧫
                </div>
              </>
            </NftCard>
          </>
        );
      })}
    </div>
  );
};

export default Home;
