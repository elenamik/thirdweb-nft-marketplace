import * as React from "react";
import InfoElement from "./InfoElement";
import { DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk/dist/node";
import { formatDisplayAddress, hexToETH, hextoNum } from "../web3utils";
import { targetChain } from "../config/targetChain";
import { MarketPlaceContractAddress } from "../config/contractAddresses";
import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

const ViewListing: React.FC<{ listing: DirectListing }> = ({ listing }) => {
  const sdk = new ThirdwebSDK(targetChain);
  const marketplaceContract = sdk.getMarketplace(
    MarketPlaceContractAddress[targetChain]
  );
  const network = useNetwork();
  console.log("NETWORK", network, network[0].data.chain);
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  console.log("ADDR", address);

  const [viewMore, setViewMore] = React.useState(false);
  const handleListingClick = () => {
    setViewMore(true);
  };
  const ref = React.useRef();
  const handleBuy = async (event: DirectListing) => {
    const result = await marketplaceContract.buyoutListing(event.id, 1);
    console.log("RESULT", result);
  };

  React.useEffect(() => {
    const closeViewMore = (event: PointerEvent) => {
      // @ts-ignore
      if (!ref.current.contains(event.target)) {
        setViewMore(false);
      }
    };
    // @ts-ignore
    document.body.addEventListener("click", closeViewMore);
    // @ts-ignore
    return () => document.body.removeEventListener("click", closeViewMore);
  }, []);

  return (
    <button
      // @ts-ignore
      ref={ref}
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
        className="space-between flex justify-between rounded-b-3xl border-0 bg-slate-300 p-3 text-slate-700"
      >
        <div
          id="title"
          className="my-auto font-josephin text-4xl font-semibold"
        >
          {listing.asset.name} (#{hextoNum(listing.asset.id)})
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
      </div>
      {viewMore && (
        <div id="overlay-div absolute top-0 w-full  h-full">
          <div
            id="buy-button"
            onClick={() => {
              console.log("handling buy");
              handleBuy(listing);
            }}
            className="absolute left-1/3 top-1/2 z-20 rounded-3xl bg-slate-900 p-4 text-xl font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105"
          >
            Buy for {hexToETH(listing.buyoutPrice)} ⧫
          </div>
          <div
            id="view-more-overlay"
            className="absolute top-0 z-10 flex h-full w-full justify-center  rounded-3xl bg-slate-400 opacity-70"
          />
        </div>
      )}
    </button>
  );
};

export default ViewListing;
