import * as React from "react";
import {
  useMetamask,
  useAddress,
  useDisconnect,
  useNetwork,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "../web3utils";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { targetChainId } from "../config/targetChainConfig";
import { ChainId } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { AlertTriangle, Search, XCircle } from "react-feather";
import { FormEvent } from "react";

const Header: React.FC = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const router = useRouter();
  const isMismatched = useNetworkMismatch();

  const [{ data: networkInfo }, switchNetwork] = useNetwork();

  const getChainName = (chainId?: ChainId) => {
    const chain = networkInfo.chains.find(
      (chain: { id: ChainId; name: string }) => chain.id === chainId
    );
    return chain?.name ?? "Unidentified network";
  };

  const Account: React.FC = () => {
    return (
      <div id="account" className=" flex items-center p-3 align-middle ">
        <div className="flex">
          <span id="address" className="pr-2 font-semibold">
            {formatDisplayAddress(address!)}
          </span>
          <XCircle className="grow-on-hover" onClick={disconnectWallet} />
        </div>
        {isMismatched && (
          <div className="flex w-56 flex-col pl-2 text-sm font-semibold">
            <div className="flex">
              <AlertTriangle />
              Wallet is connected to wrong network (
              {getChainName(networkInfo?.chain?.id)})
            </div>
            <button
              className="primary-button"
              onClick={() => switchNetwork!(targetChainId)}
            >
              switch to {getChainName(targetChainId)}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="flex w-full justify-between border-b px-6 py-2 shadow-md">
        <Link href="/" id="logo">
          <div className="grow-on-hover">
            <div className="flex h-full w-1/6 flex-row items-center">
              <img
                src="/logo_thirdsea.png"
                className="mr-2 w-12 object-scale-down "
              />
              <h1 id="title" className="text-3xl font-semibold text-slate-800">
                ThirdSea
              </h1>
            </div>
          </div>
        </Link>
        <ul className="flex">
          <li>
            <form
              className="relative w-full max-w-4xl"
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const address = e.target[0].value;
                router.push(`/collection/${address}`);
              }}
            >
              <input
                className="primary-input  h-12 w-full pr-4 pl-11"
                type="search"
                placeholder="View NFTs by owner"
              />
              <Search className="absolute inset-y-0 left-4 my-auto w-5 object-scale-down" />
            </form>
          </li>
          <li>
            <Link href="/" id="listings">
              <div className="grow-on-hover   whitespace-nowrap p-3 font-normal text-slate-700 hover:font-semibold ">
                Listings
              </div>
            </Link>
          </li>

          {!address && (
            <li>
              <button
                id="buy-button"
                onClick={connectWithMetamask}
                className="primary-button  p-3"
              >
                Connect
              </button>
            </li>
          )}
          {address && (
            <>
              <li>
                <Link href={`/collection/${address}`} id="my collection">
                  <div className="grow-on-hover  whitespace-nowrap p-3 font-normal text-slate-700 hover:font-semibold ">
                    My Collection
                  </div>
                </Link>
              </li>
              <li>
                <Account />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
