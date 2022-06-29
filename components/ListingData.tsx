import * as React from "react";
import InfoElement from "./InfoElement";
import { DirectListing } from "@thirdweb-dev/sdk/dist/node";
import { formatDisplayAddress, hexToETH, hextoNum } from "../web3utils";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
export const ListingData: React.FC<{
  listing: AuctionListing | DirectListing;
}> = ({ listing }) => {
  return (
    <>
      <div id={"listing info"} className="ml-6 mt-1">
        <div className="font-josephin text-4xl font-semibold" id="title">
          {listing?.asset.name} (#{hextoNum(listing?.asset.id!)})
        </div>
        <div className="pl-1">{listing?.asset.description}</div>
      </div>
      <div id="sell-data" className="flex flex-col">
        <InfoElement
          name="Listing Price"
          data={`${hexToETH(listing.buyoutPrice)} ⧫`}
        />
        <InfoElement
          name="Seller"
          data={formatDisplayAddress(listing.sellerAddress)}
        />
      </div>
    </>
  );
};

export default ListingData;
