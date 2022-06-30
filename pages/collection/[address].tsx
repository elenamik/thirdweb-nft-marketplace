import { NextPage, NextPageContext } from "next";
import { getAlchemyEndpoint } from "../../config/endpoints";

import * as React from "react";
import { OwnedNft, OwnedNftsResponse } from "@alch/alchemy-sdk";
import { formatDisplayAddress } from "../../web3utils";

const NftCard: React.FC<{ data: OwnedNft }> = ({ data }) => {
  const id = data.id.tokenId;
  const image = data.media[0].gateway;
  const address = data.contract.address;
  const description = data.description;

  return (
    <div className="m-6 w-1/4 rounded-3xl bg-slate-200 text-slate-700 hover:shadow-lg">
      <img className="w-full rounded-t-3xl " key={id} src={image}></img>
      <div className="p-3">
        <div className="mb-3 flex">
          <div className="grow">
            <h3 className="font-josephin text-2xl font-semibold">
              {data.title}
            </h3>
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
        <p>{description ? description.slice(0, 200) : "No Description"}</p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { address } = context.query;

  // TODO: wrap in try catch
  const alchemyEndpoint = getAlchemyEndpoint(process.env.ALCHEMY_API_KEY!);
  const data = await fetch(`${alchemyEndpoint}/getNFTs?owner=${address}`).then(
    (data) => data.json()
  );

  return { props: { data: JSON.stringify(data) } };
}

const CollectionPage: NextPage<{ data: string }> = (props) => {
  const data: OwnedNftsResponse = JSON.parse(props.data);
  const nfts = data.ownedNfts.map((ownedNft: OwnedNft) => {
    return <NftCard data={ownedNft} />;
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
