import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { targetChain } from "../../config/targetChain";
import { MarketPlaceContractAddress } from "../../config/contractAddresses";
import {
  AuctionListing,
  DirectListing,
} from "@thirdweb-dev/sdk/dist/src/types/marketplace";
import { BigNumber, ethers } from "ethers";
import * as React from "react";
import { ListingData } from "../../components/ListingData";
import LargeInfoText from "../../components/LargeInfoText";

const handleConnect = async () => {
  try {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider);

    const signer = provider.getSigner();
    console.log("signer", signer);

    if (!signer) return;
    const sdk = ThirdwebSDK.fromSigner(signer, "mumbai");
    console.log("Connected");
    return sdk;
  } catch (e) {
    console.log(e);
  }
};

const ListingPage: NextPage = () => {
  const router = useRouter();

  // initialize with read only
  const [sdk, setSDK] = React.useState(new ThirdwebSDK(targetChain));

  React.useEffect(() => {
    const loadSDK = async () => {
      const sdkWithSigner = await handleConnect();
      if (sdkWithSigner) {
        setSDK(sdkWithSigner);
      }
    };
    loadSDK();
  }, []);

  const marketplaceContract = sdk.getMarketplace(
    MarketPlaceContractAddress[targetChain]
  );

  const { listingId } = router.query as { listingId: string };

  const listingQuery = useQuery<AuctionListing | DirectListing>({
    queryFn: () => {
      return marketplaceContract.getListing(BigNumber.from(listingId));
    },
    enabled: !!listingId,
  });

  const handleBuy = async (event: DirectListing) => {
    console.log(event);
    console.log("SDK", sdk);
    console.log("CONTRACT", marketplaceContract);
    const result = await marketplaceContract.buyoutListing(event.id, 1);
    console.log("RESULT", result);
  };

  if (listingQuery.isLoading) {
    return (
      <div className="p-6 font-josephin text-2xl font-semibold">Loading...</div>
    );
  }
  if (listingQuery.isError || (listingQuery.isSuccess && !listingQuery.data)) {
    return <LargeInfoText message={"Error Loading Listing"} />;
  }
  const listing = listingQuery.data;
  return (
    <div id="container" className="flex w-full flex-row p-6 px-10">
      <img
        id="image"
        className="max-w-xl rounded-3xl border-4"
        src={listing?.asset.image!}
      />
      <div id="listing-data" className="w-3/4 p-2 align-middle text-slate-900">
        <ListingData listing={listing} handleBuy={() => handleBuy(listing)} />
      </div>
    </div>
  );
};

export default ListingPage;
