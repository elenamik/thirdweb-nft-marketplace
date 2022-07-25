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

  const AccountButton: React.FC<{ text: string; handleClick: any }> = ({
    text,
    handleClick,
  }) => {
    return (
      <button
        id="buy-button"
        onClick={handleClick}
        className="rounded-3xl bg-slate-400 p-2 text-center text-lg font-semibold text-slate-700 transition ease-in-out hover:border-4 hover:border-slate-700 hover:shadow-lg  active:scale-105"
      >
        {text}
      </button>
    );
  };

  return (
    <div className="fixed top-0 z-10 w-full bg-white">
      <nav className="flex w-full border-b px-6 shadow-md">
        <Link href="/" id="logo">
          <div className="transition ease-in-out hover:scale-105 active:scale-105">
            <div className="flex h-full w-1/6 flex-row items-center">
              <img
                src="/logo_thirdsea.png"
                className="mr-2 w-12 object-scale-down "
              />
              <h1 id="title" className="text-2xl font-semibold text-slate-800">
                ThirdSea
              </h1>
            </div>
          </div>
        </Link>

        <div id="nav" className="flex flex-row align-middle">
          {!address ? (
            <AccountButton
              text="Connect Wallet"
              handleClick={connectWithMetamask}
            />
          ) : (
            <>
              <button
                className="p-3 text-2xl  font-normal text-slate-700 transition ease-in-out hover:scale-105 hover:font-semibold "
                onClick={() => {
                  router.push("/");
                }}
                id="listings"
              >
                Listings
              </button>
              <button
                className="p-3 text-2xl  font-normal text-slate-700 transition ease-in-out hover:scale-105 hover:font-semibold "
                onClick={() => {
                  router.push("/explore");
                }}
                id="explore"
              >
                Explore
              </button>
              <button
                className="p-3 text-2xl  font-normal text-slate-700 transition ease-in-out hover:scale-105 hover:font-semibold "
                onClick={() => {
                  router.push(`/collection/${address}`);
                }}
                id="my-coll"
              >
                My Collection
              </button>

              <div id="account" className="my-auto flex align-middle ">
                {isMismatched && (
                  <div>
                    Wallet is connected to wrong network (
                    {getChainName(networkInfo?.chain?.id)}) <br />
                    <button onClick={() => switchNetwork!(targetChainId)}>
                      switch to
                      {getChainName(targetChainId)}
                    </button>
                  </div>
                )}
                <AccountButton
                  text="Disconnect Wallet"
                  handleClick={disconnectWallet}
                />
                <div className="text-lg font-medium text-slate-700">
                  <span className="pl-2 text-3xl font-normal">|</span>
                  <span id="address" className="p-2">
                    {formatDisplayAddress(address)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
