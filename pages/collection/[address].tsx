import { NextPage, NextPageContext } from "next";

import * as React from "react";
import {
  OwnedNft,
  OwnedNftsResponse,
  getNftsForOwner,
} from "@alch/alchemy-sdk";
import NftCard from "../../components/NftCard";
import { alchemy } from "../../config/alchemy";
import { formatDisplayAddress } from "../../web3utils";
import { useRouter } from "next/router";

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
    return (
      <NftCard data={ownedNft} key={ownedNft.tokenId}>
        <div id="container w-full">
          <div className="flex flex-row justify-between">
            <div className="font-josephin text-2xl font-semibold">
              {ownedNft.title}
            </div>
            <div className="mr-3 flex">
              <a
                target="_blank"
                className="text-blue-700"
                href={`https://etherscan.io/token/${address}`}
                rel="noreferrer"
              >
                {formatDisplayAddress(address)}
              </a>
            </div>
          </div>
          <span>(#{ownedNft.tokenId})</span>
          <p>{description ? description.slice(0, 200) : "No Description"}</p>
          <div
            id="list-button"
            onClick={() => {
              router.push(
                `/create-listing/${address}?tokenId=${ownedNft.tokenId}`
              );
            }}
            className="primary-button w-1/2"
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
