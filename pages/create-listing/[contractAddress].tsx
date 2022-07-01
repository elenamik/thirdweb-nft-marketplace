import { NextPage, NextPageContext } from "next";

import * as React from "react";
import { getNftMetadata, OwnedNft } from "@alch/alchemy-sdk";
import { useMarketplace } from "@thirdweb-dev/react";
import { MarketPlaceContractAddress } from "../../config/contractAddresses";
import { targetChain } from "../../config/targetChain";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { alchemy } from "../../config/alchemy";
import { NftTokenType } from "@alch/alchemy-sdk/dist/src/types/types";
import NftCard from "../../components/NftCard";

export async function getServerSideProps(context: NextPageContext) {
  const contractAddress: string = context.query.contractAddress;
  const tokenId: string = context.query.tokenId!;

  // TODO: wrap in try catch
  const data = await getNftMetadata(alchemy, {
    tokenId,
    contract: { address: contractAddress },
    tokenType: NftTokenType.ERC721,
  });

  return { props: { data: JSON.stringify(data) } };
}

const CreateListingPage: NextPage<{ data: string }> = (props) => {
  const router = useRouter();
  const NFT = JSON.parse(props.data);
  console.log("DATA", NFT);
  const { contractAddress } = router.query as { contractAddress: string };

  const marketplace = useMarketplace(MarketPlaceContractAddress[targetChain]);

  const createListing = async (nft: OwnedNft, listingPrice: string) => {
    const listing = {
      assetContractAddress: nft.contract.address,
      tokenId: nft.tokenId,
      startTimestamp: new Date(),
      listingDurationInSeconds: 86400,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: listingPrice,
    };

    const tx = await marketplace!.direct.createListing(listing);
    if (tx.id) {
      const listingId = tx.id; // the id of the newly created listing
      router.push(`/listing/${listingId}`);
    }
  };

  return (
    <div
      id="container"
      className="flex w-full flex-row justify-center p-6 px-10"
    >
      <NftCard data={NFT} enableCreateList={false} />
      <div id="list-form" className="pt-6">
        <div className=" flex flex-col rounded-2xl bg-slate-200 p-10 text-2xl">
          <span className="text-center font-josephin font-semibold">
            List NFT For:
          </span>
          <div>
            <input
              type="number"
              className="max-w-sm rounded-2xl bg-slate-300 p-2"
              value={1}
            />
            {"  "}⧫
          </div>
          <button className="m-1 mt-6 rounded-3xl bg-slate-900 p-4 text-center text-2xl font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105">
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
