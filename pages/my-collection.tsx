import { NextPage } from "next";
import { useRouter } from "next/router";

import * as React from "react";
import { useListing, useMarketplace } from "@thirdweb-dev/react";
import { DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { MarketPlaceContractAddress } from "../config/contractAddresses";
import { targetChain } from "../config/targetChain";
import ListingData from "../components/ListingData";
import { ethers } from "ethers";

const MyCollectionPage: NextPage = () => {
  const handleConnect = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      if (!signer) return;
      const sdk = ThirdwebSDK.fromSigner(signer, "mumbai");
      console.log("Connected");
    } catch (e) {
      console.log(e);
    }
  };

  const router = useRouter();
  const { listingId } = router.query as { listingId: string };

  const marketplace = useMarketplace(MarketPlaceContractAddress[targetChain]);

  const { data: listing, isLoading } = useListing(marketplace, listingId);

  const handleBuy = async (event: DirectListing | AuctionListing) => {
    try {
      await marketplace!.buyoutListing(event.id, 1);
      alert("NFT purchased, congratulations!");
    } catch (e: any) {
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
    <div id="container" className="flex w-full flex-row p-6 px-10">
      <img
        id="image"
        className="max-w-xl rounded-3xl border-4"
        src={listing?.asset.image!}
      />
      <div id="listing-data" className="w-3/4 p-2 align-middle text-slate-900">
        <ListingData listing={listing} handleBuy={() => handleBuy(listing)} />
      </div>
    </div>
  );
};

export default MyCollectionPage;
