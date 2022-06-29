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
import LargeInfoText from "../../components/LargeInfoText";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const sdk = new ThirdwebSDK(targetChain);

  const marketplaceContract = sdk.getMarketplace(
    MarketPlaceContractAddress[targetChain]
  );

  const { listingId } = router.query as { listingId: string };

  const listingQuery = useQuery<AuctionListing | DirectListing>({
    queryFn: () => {
      return marketplaceContract.getListing(BigNumber.from(listingId));
    },
    enabled: !!listingId,
  });

  const handleBuy = async (event: DirectListing) => {
    const result = await marketplaceContract.buyoutListing(event.id, 1);
    console.log("RESULT", result);
  };

  if (listingQuery.isLoading) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">Loading...</div>
    );
  }
  if (listingQuery.isError || (listingQuery.isSuccess && !listingQuery.data)) {
    return <LargeInfoText message={"Error Loading Listing"} />;
  }
  const listing = listingQuery.data;
  return (
    <div id="container" className="flex w-full flex-row p-6 px-10">
      <img
        id="image"
        className="max-w-xl rounded-3xl border-4"
        src={listing?.asset.image!}
      />
      <div id="listing-data" className="w-3/4 p-2 align-middle text-slate-900">
        <ListingData listing={listing} handleBuy={handleBuy} />
      </div>
    </div>
  );
};

export default ListingPage;
