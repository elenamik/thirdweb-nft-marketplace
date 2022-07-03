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
    </div>
  );
};

export default NftCard;
