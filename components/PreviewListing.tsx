import * as React from "react";
import { DirectListing, AuctionListing } from "@thirdweb-dev/sdk/dist/node";
import { hextoNum } from "../web3utils";

import ListingData from "./ListingData";
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
    <div id="listing-container" className="m-6 max-h-fit w-1/4">
      <button
        onClick={handleListingClick}
        className=" rounded-3xl text-left transition ease-in-out hover:shadow-lg active:scale-105"
      >
        <img
          id="image"
          className="flex w-full grow rounded-t-3xl border-0"
          src={listing.asset.image!}
        />
        <div
          id="image-metadata"
          className="flex min-h-fit grow justify-between rounded-b-3xl border-0 bg-slate-300 p-3 text-slate-900"
        >
          <ListingData listing={listing} />
        </div>
      </button>
    </div>
  );
};

export default PreviewListing;
