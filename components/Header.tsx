import Link from "next/link";

import * as React from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "../web3utils";

const Header: React.FC = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const router = useRouter();

  return (
    <div
      id="hero"
      className="flex flex-row justify-between bg-slate-100 px-6 pt-6 pb-2"
    >
      <span
        onClick={() => {
          router.push("/");
        }}
        id="hero-logo"
        className="text-left font-josephin text-5xl font-bold text-slate-700"
      >
        ThirdSea
      </span>
      <div id="nav" className="flex flex-row">
        <Link href={"/nfts"}>My Collection</Link>
        {!address ? (
          <button
            onClick={connectWithMetamask}
            id="wallet"
            className="text-md h-12 rounded-3xl bg-slate-700 px-4 font-medium text-slate-50"
          >
            Connect Wallet
          </button>
        ) : (
          <div id="account" className="flex align-middle">
            <button
              onClick={disconnectWallet}
              id="disconnect"
              className="text-md h-12 rounded-3xl bg-slate-700 px-4 font-medium text-slate-50"
            >
              Disconnect Wallet
            </button>
            <div className="p-2 text-lg font-medium text-slate-700">
              <span className="text-3xl font-normal">|</span>
              <span id="address" className="p-2">
                {formatDisplayAddress(address)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
