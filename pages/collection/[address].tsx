import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { getAlchemyEndpoint } from "../../config/endpoints";

import * as React from "react";
import { OwnedNft, OwnedNftsResponse, NftMetadata } from "@alch/alchemy-sdk";
import { formatDisplayAddress } from "../../web3utils";

const NftCard: React.FC<{ data: OwnedNft }> = ({ data }) => {
  const id = data.id.tokenId;
  const image = data.media[0].gateway;
  const address = data.contract.address;
  const description = data.description;
  const attributes = data.metadata.attributes;

  return (
    <div className="mr-3 mb-4 w-1/4 rounded-md bg-slate-100">
      <img className="w-full rounded-t-md" key={id} src={image}></img>
      <div className="p-3">
        <div className="mb-3 flex">
          <div className="grow">
            <h3 className="text-xl">{data.title}</h3>
            <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
          </div>
          <div className="mr-3 flex">
            <a
              target="_blank"
              className="text-blue-700"
              href={`https://etherscan.io/token/${address}`}
              rel="noreferrer"
            >{`${address.slice(0, 4)}...${address.slice(
              address.length - 4
            )}`}</a>
          </div>
        </div>
        <p>{description ? description.slice(0, 200) : "No Description"}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center p-3 ">
        {attributes?.length > 0 &&
          attributes.map((attribute: NftMetadata["attributes"]) => {
            return (
              <div className="mb-2 flex w-1/2 flex-col justify-start">
                <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                <p className="text-sm">{attribute.value}</p>
              </div>
            );
          })}
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
  console.log("DATA", data);
  const router = useRouter();
  const { address } = router.query as { address: string };

  const nfts = data.ownedNfts.map((ownedNft: OwnedNft) => {
    return <NftCard data={ownedNft} />;
  });

  return (
    <div id="container" className="p-6 px-10">
      <div className="p-4 pt-2 text-center font-josephin text-3xl">
        Collection At {formatDisplayAddress(address)}
      </div>
      <div id="container" className="flex w-full flex-wrap justify-center">
        {nfts}
      </div>
    </div>
  );
};

export default CollectionPage;
