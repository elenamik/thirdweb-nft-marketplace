import { NextPage, NextPageContext } from "next";

import * as React from "react";
import {
  OwnedNft,
  OwnedNftsResponse,
  getNftsForOwner,
} from "@alch/alchemy-sdk";
import NftCard from "../../components/NftCard";
import { alchemy } from "../../config/alchemy";

export async function getServerSideProps(context: NextPageContext) {
  const address: string = context.query.address;

  // TODO: wrap in try catch
  const data = await getNftsForOwner(alchemy, address);

  return { props: { data: JSON.stringify(data) } };
}

const CollectionPage: NextPage<{ data: string }> = (props) => {
  const data: OwnedNftsResponse = JSON.parse(props.data);

  const nfts = data.ownedNfts.map((ownedNft: OwnedNft) => {
    return <NftCard data={ownedNft} enableCreateList={true} />;
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
