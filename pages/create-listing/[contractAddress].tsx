import { NextPage, NextPageContext } from "next";

import * as React from "react";
import { getNftMetadata, Nft, NftTokenType } from "@alch/alchemy-sdk";
import { MediaRenderer, useMarketplace } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { readAppContractAddresses } from "../../config/contractAddresses";
import { alchemy } from "../../config/alchemy";
import { TransactionResultWithId } from "@thirdweb-dev/sdk/dist/src/core/types";

export async function getServerSideProps(context: NextPageContext) {
  const contractAddress: string | string[] | undefined =
    context.query.contractAddress;
  const tokenId: string | string[] | undefined = context.query.tokenId;

  const data = await getNftMetadata(alchemy, {
    tokenId: tokenId?.toString() ?? "",
    contract: { address: contractAddress?.toString() ?? "" },
    tokenType: NftTokenType.ERC721,
  });

  return { props: { data: JSON.stringify(data) } };
}

const CreateListingPage: NextPage<{ data: string }> = ({ data }) => {
  const router = useRouter();
  const NFT: Nft = JSON.parse(data);
  const [price, setPrice] = React.useState<number>(0.05);

  const marketplace = useMarketplace(readAppContractAddresses("Marketplace"));

  const createListing = async () => {
    return marketplace!.direct.createListing({
      assetContractAddress: NFT.contract.address,
      tokenId: NFT.tokenId,
      startTimestamp: new Date(),
      listingDurationInSeconds: 86400,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: price,
    });
  };
  const { mutate: create, isLoading } = useMutation({
    mutationFn: createListing,
    onError: (err: any) => {
      console.error(err);
      alert(err);
    },
    onSuccess: (txn: TransactionResultWithId) => {
      router.push(`/listing/${txn.id}`);
    },
  });

  const handlePriceChange = (event: { target: { value: number } }) => {
    setPrice(event.target.value);
  };

  if (!NFT) {
    return <div className="large-text">No Data To Show</div>;
  }

  return (
    <div
      id="container"
      className="flex w-full flex-row justify-center p-6 px-10"
    >
      <div id="image" className="w-1/2 rounded-lg pr-10">
        <MediaRenderer
          src={NFT.media[0].gateway}
          style={{
            // Fit the image to the container
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
        />
      </div>
      <div id="list-form" className="pt-6">
        <div className=" flex flex-col rounded-2xl border border-slate-200 p-10 text-xl">
          <span className="text-center font-semibold">List NFT For:</span>
          <div>
            <input
              type="number"
              className="primary-input max-w-sm p-1"
              value={price}
              onChange={handlePriceChange}
            />
            {"  "}⧫
          </div>
          {isLoading ? (
            <>
              <button disabled={true} className="primary-button mt-4">
                Creating Listing...
              </button>
              <div className="text-sm text-slate-800">
                We will reroute you when the transaction is completed
              </div>
            </>
          ) : (
            <button onClick={create} className="primary-button mt-4">
              Execute
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
