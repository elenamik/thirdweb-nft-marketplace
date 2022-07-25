import { NextPage, NextPageContext } from "next";

import * as React from "react";
import {
  OwnedNft,
  OwnedNftsResponse,
  getNftsForOwner,
} from "@alch/alchemy-sdk";
import NftCard from "../../components/NftCard";
import { alchemy } from "../../config/alchemy";
import { useRouter } from "next/router";
import NFTInfo from "../../components/NFTInfo";

export async function getServerSideProps(context: NextPageContext) {
  const address: string | string[] | undefined = context.query.address;
  // TODO: wrap in try catch
  const data = await getNftsForOwner(alchemy, address?.toString() ?? "");
  return { props: { data: JSON.stringify(data) } };
}

const CollectionPage: NextPage<{ data: string }> = ({ data }) => {
  const fetchedData: OwnedNftsResponse = JSON.parse(data);
  const router = useRouter();

  const nfts = fetchedData.ownedNfts.map((ownedNft: OwnedNft) => {
    const address = ownedNft.contract.address;
    const description = ownedNft.description;
    const image = ownedNft.media[0]?.gateway;
    return (
      <NftCard image={image} key={ownedNft.tokenId}>
        <div id="container w-full">
          <NFTInfo
            id={ownedNft.tokenId}
            description={description}
            title={ownedNft.title}
            address={address}
          />
          <div
            id="list-button"
            onClick={() => {
              router.push(
                `/create-listing/${address}?tokenId=${ownedNft.tokenId}`
              );
            }}
            className="primary-button mt-2"
          >
            List NFT
          </div>
        </div>
      </NftCard>
    );
  });

  return (
    <div id="container" className="p-6 px-10">
      <div id="container" className="flex w-full flex-wrap justify-center">
        {nfts}
      </div>
    </div>
  );
};

export default CollectionPage;
