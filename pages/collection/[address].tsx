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
import { useAddress } from "@thirdweb-dev/react";

export async function getServerSideProps(context: NextPageContext) {
  const address: string | string[] | undefined = context.query.address;
  /***
   * TODO: fetch NFTs from address with Alchemy
   */
  return { props: { data: [], address } };
}

const CollectionPage: NextPage<{ data: string }> = ({ data, address }) => {
  const router = useRouter();
  const userAddress = useAddress();
  const viewingOwnCollection = userAddress === JSON.parse(address);
  /***
   * TODO: replace fetchedData with data from server side props
   */
  const fetchedData = [];

  const nfts = fetchedData?.ownedNfts?.map((ownedNft: OwnedNft) => {
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
          {viewingOwnCollection && (
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
          )}
        </div>
      </NftCard>
    );
  });

  if (!nfts || nfts.length === 0) {
    return <div className="large-text">No Data To Show</div>;
  }
  return (
    <div id="container" className="p-6 px-10">
      <div id="container" className="flex w-full flex-wrap justify-center">
        {nfts}
      </div>
    </div>
  );
};

export default CollectionPage;
