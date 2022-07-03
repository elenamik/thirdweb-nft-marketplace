import * as React from "react";
import { OwnedNft } from "@alch/alchemy-sdk";
import { MediaRenderer } from "@thirdweb-dev/react";

export const NftCard: React.FC<{
  data: OwnedNft;
  children: React.ReactElement<any, any>;
}> = ({ data, children }) => {
  const image = data.media[0].gateway;

  return (
    <div className="m-6 w-1/4 rounded-3xl bg-slate-200 text-slate-700 hover:shadow-lg">
      <div className="rounded-3xl">
        <MediaRenderer
          src={image}
          style={{
            // Fit the image to the container
            width: "100%",
            height: "100%",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}
        />
      </div>
      <div className="p-3">{children}</div>
      {/*<img className="w-full rounded-t-3xl " key={id} src={image}></img>*/}

      {/*{enableCreateList && (*/}
      {/*  <div*/}
      {/*    id="list-button"*/}
      {/*    onClick={() => {*/}
      {/*      router.push(`/create-listing/${address}?tokenId=${id}`);*/}
      {/*    }}*/}
      {/*    className="m-1 rounded-3xl bg-slate-900 p-2 text-center text-lg font-semibold text-slate-200 transition ease-in-out hover:border-4 hover:border-slate-200 hover:shadow-lg  active:scale-105"*/}
      {/*  >*/}
      {/*    List NFT*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default NftCard;
