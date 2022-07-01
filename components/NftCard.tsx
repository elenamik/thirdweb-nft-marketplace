import * as React from "react";
import { OwnedNft } from "@alch/alchemy-sdk";
import { formatDisplayAddress } from "../web3utils";
import { useRouter } from "next/router";

export const NftCard: React.FC<{
  data: OwnedNft;
  enableCreateList: boolean;
}> = ({ data, enableCreateList }) => {
  const id = data.tokenId;
  const image = data.media[0].gateway;
  const address = data.contract.address;
  const description = data.description;

  const router = useRouter();

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
        {enableCreateList && (
          <div
            id="list-button"
            onClick={() => {
              router.push(`/create-listing/${address}?tokenId=${id}`);
            }}
            className="m-1 rounded-3xl bg-slate-900 p-2 text-center text-lg font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105"
          >
            List NFT
          </div>
        )}
      </div>
    </div>
  );
};

export default NftCard;
