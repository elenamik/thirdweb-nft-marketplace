import * as React from "react";
import { DirectListing } from "@thirdweb-dev/sdk/dist/node";
import { hextoNum } from "../web3utils";

import ListingData from "./ListingData";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { useRouter } from "next/router";

const PreviewListing: React.FC<{ listing: AuctionListing | DirectListing }> = ({
  listing,
}) => {
  const router = useRouter();

  const handleListingClick = () => {
    const id = hextoNum(listing.asset.id!);
    router.push(`/listing/${id}`);
  };

  return (
    <button
      onClick={handleListingClick}
      className="min-w-400 max-w-400 duration-50 relative z-0 m-6 rounded-3xl border text-left transition ease-in-out hover:shadow-lg active:scale-105"
    >
      <img
        id="image"
        className="max-w-md rounded-t-3xl border-0"
        src={listing.asset.image!}
      />
      <div
        id="image-metadata"
        className="space-between flex justify-between rounded-b-3xl border-0 bg-slate-300 p-3 text-slate-900"
      >
        <ListingData
          listing={listing}
          handleBuy={() => {
            console.log("nada");
            // TOOD: add logic to buy here too
          }}
        />
      </div>
    </button>
  );
};

export default PreviewListing;