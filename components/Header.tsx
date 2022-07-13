import * as React from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "../web3utils";

const Header: React.FC = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const router = useRouter();

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
    <div id="hero" className="flex flex-row justify-between bg-slate-100 p-4">
      <button
        onClick={() => {
          router.push("/");
        }}
        id="hero-logo"
        className="pt-2 font-josephin text-5xl font-semibold text-slate-700 transition ease-in-out hover:scale-105 active:scale-105"
      >
        ThirdSea
      </button>
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
    </div>
  );
};

export default Header;
