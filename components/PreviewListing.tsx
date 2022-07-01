import * as React from "react";
import { DirectListing } from "@thirdweb-dev/sdk/dist/node";
import { hextoNum } from "../web3utils";

import ListingData from "./ListingData";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { useRouter } from "next/router";
import { useMarketplace } from "@thirdweb-dev/react";
import { MarketPlaceContractAddress } from "../config/contractAddresses";
import { targetChain } from "../config/targetChain";

const PreviewListing: React.FC<{ listing: AuctionListing | DirectListing }> = ({
  listing,
}) => {
  const router = useRouter();

  const marketplace = useMarketplace(MarketPlaceContractAddress[targetChain]);

  const handleBuy = async (event: DirectListing | AuctionListing) => {
    try {
      await marketplace!.buyoutListing(event.id, 1);
      alert("NFT purchased, congratulations!");
    } catch (e: any) {
      alert(`Error purchasing NFT: ${e}`);
    }
  };

  const handleListingClick = () => {
    const id = hextoNum(listing.asset.id!);
    router.push(`/listing/${id}`);
  };

  return (
    <button
      onClick={handleListingClick}
      className="min-w-400 max-w-400 relative z-0 m-6 rounded-3xl border text-left transition ease-in-out hover:shadow-lg active:scale-105"
    >
      <img
        id="image"
        className="max-w-md rounded-t-3xl border-0"
        src={listing.asset.image!}
      />
      <div
        id="image-metadata"
        className="flex justify-between rounded-b-3xl border-0 bg-slate-300 p-3 text-slate-900"
      >
        <ListingData
          listing={listing}
          handleBuy={() => {
            handleBuy(listing);
          }}
        />
      </div>
    </button>
  );
};

export default PreviewListing;
