import * as React from "react";
import { formatDisplayAddress } from "../web3utils";

export const NFTInfo: React.FC<{
  id: string;
  description: string;
  title: string;
  address: string;
}> = ({ id, description, title, address }) => {
  return (
    <>
      <div id="title-and-link" className="flex flex-row justify-between">
        <div className="font-josephin text-2xl font-semibold">{`${title} (#${id})`}</div>
        <div className="mr-3 flex">
          <div className="text-right">
            <span className="font-bold">Token Address: </span>
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
      </div>
      <p>{description ? description.slice(0, 200) : "No Description"}</p>
    </>
  );
};

export default NFTInfo;
