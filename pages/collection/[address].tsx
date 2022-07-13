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
  const address: string = context.query.address;
  // TODO: wrap in try catch
  const data = await getNftsForOwner(alchemy, address);

  return { props: { data: JSON.stringify(data) } };
}

const CollectionPage: NextPage<{ data: string }> = (props) => {
  const data: OwnedNftsResponse = JSON.parse(props.data);
  const router = useRouter();

  const nfts = data.ownedNfts.map((ownedNft: OwnedNft) => {
    const address = ownedNft.contract.address;
    const description = ownedNft.description;
    const image = ownedNft.media[0].gateway;
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
            className="primary-button w-100"
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
