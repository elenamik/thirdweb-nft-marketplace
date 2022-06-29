import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { targetChain } from "../../config/targetChain";
import { MarketPlaceContractAddress } from "../../config/contractAddresses";
import {
  AuctionListing,
  DirectListing,
} from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { BigNumber } from "ethers";
import * as React from "react";
import { ListingData } from "../../components/ListingData";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const sdk = new ThirdwebSDK(targetChain);

  const marketplaceContract = sdk.getMarketplace(
    MarketPlaceContractAddress[targetChain]
  );

  const { listingId } = router.query as { listingId: string };
  console.log("listing ID", listingId);

  const listingQuery = useQuery<AuctionListing | DirectListing>({
    queryFn: () => {
      return marketplaceContract.getListing(BigNumber.from(listingId));
    },
    enabled: !!listingId,
  });
  if (listingQuery.isLoading) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">Loading...</div>
    );
  }
  if (listingQuery.isError || (listingQuery.isSuccess && !listingQuery.data)) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">
        Error Loading Listing
      </div>
    );
  }
  const listing = listingQuery.data;
  return (
    <div id="container" className="flex flex-row p-6">
      <img
        id="image"
        className="max-w-xl rounded-3xl border-4"
        src={listing?.asset.image!}
      />
      <div
        id="listing-data"
        className="flex-flow flex w-full justify-between pt-2"
      >
        <ListingData listing={listing} />
      </div>
    </div>
  );
};

export default ListingPage;
