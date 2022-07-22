import { NextPage } from "next";
import { useRouter } from "next/router";
import { readAppContractAddresses } from "../../config/contractAddresses";

import * as React from "react";
import {
  MediaRenderer,
  useAddress,
  useListing,
  useMarketplace,
} from "@thirdweb-dev/react";
import { formatDisplayAddress, hexToETH } from "../../web3utils";

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { listingId } = router.query as { listingId: string };

  const address = useAddress();

  const marketplace = useMarketplace(readAppContractAddresses("Marketplace"));

  const { data: listing, isLoading } = useListing(marketplace, listingId);

  const handleBuy = async () => {
    try {
      await marketplace!.buyoutListing(listingId, 1);
      router.push(`/collection/${address}`);
    } catch (e: any) {
      console.error(e);
      alert(`Error purchasing NFT: ${e}`);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">Loading...</div>
    );
  }
  if (!listing && !isLoading) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">
        There was an error loading the listing.
      </div>
    );
  }
  return (
    <div
      id="container"
      className="flex w-full flex-row justify-center  p-6 px-10 text-lg"
    >
      <div id="image" className="w-1/3 rounded-3xl">
        <MediaRenderer
          src={listing?.asset.image}
          style={{
            // Fit the image to the container
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        />
      </div>
      <div id="sell-data" className="flex flex-col p-6">
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
        <div
          id="buy-button"
          onClick={handleBuy}
          className="primary-button w-full"
        >
          Buy for {hexToETH(listing.buyoutPrice)} ⧫
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
