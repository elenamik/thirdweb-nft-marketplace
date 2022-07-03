import * as React from "react";
import InfoElement from "./InfoElement";
import { DirectListing } from "@thirdweb-dev/sdk/dist/node";
import { formatDisplayAddress, hexToETH, hextoNum } from "../web3utils";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
export const ListingData: React.FC<{
  listing: AuctionListing | DirectListing;
  handleBuy?: () => {};
}> = ({ listing, handleBuy }) => {
  if (!listing) return <div className="large-text">Loading...</div>;
  return (
    <div className="flex grow justify-between">
      <div id="listing-header" className="flex flex-col justify-center p-1">
        <div className="font-josephin text-2xl font-semibold" id="title">
          {listing?.asset.name} (#{hextoNum(listing?.asset.id!)})
        </div>
        <div className="pl-1">{listing?.asset.description}</div>
      </div>

      <div id="sell-data" className="flex grow flex-col justify-center p-1">
        <InfoElement
          name="Listing Price"
          data={`${hexToETH(listing.buyoutPrice)} ⧫`}
        />
        <InfoElement
          name="Seller"
          data={formatDisplayAddress(listing.sellerAddress)}
        />
        {handleBuy && (
          <div
            id="buy-button"
            onClick={handleBuy}
            className="m-1 rounded-3xl bg-slate-900 p-2 text-center text-lg font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105"
          >
            Buy for {hexToETH(listing.buyoutPrice)} ⧫
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingData;
