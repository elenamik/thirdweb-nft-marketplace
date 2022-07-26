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

const Home: NextPage = () => {
  /***
   * TODO: replace isLoading and data with logic to read listings from marketplace
   */
  const isLoading = false;
  const data = [];

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  if (isLoading) {
    return <div className="large-text">Loading...</div>;
  } else if (data.length === 0) {
    return <div className="large-text">No Data To Show</div>;
  }

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
                  className="flex flex-col  justify-between pt-2 text-sm "
                >
                  <div className="text-left ">
                    <span className="font-bold">Listing Price: </span>
                    {`${hexToETH(listing.buyoutPrice)} ⧫`}
                  </div>
                  <div className="mt-1 text-left">
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
                  id="buy-button "
                  onClick={() => {
                    router.push(`/listing/${listing.id}`);
                  }}
                  className="primary-button mt-2"
                >
                  View Listing
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
