import * as React from "react";
import { MediaRenderer } from "@thirdweb-dev/react";

export const NftCard: React.FC<{
  image: string;
  children: React.ReactElement<any, any>;
}> = ({ image, children }) => {
  return (
    <div className="m-6 flex w-1/4 flex-col rounded-3xl bg-slate-200 text-slate-700 hover:shadow-lg">
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
      <div className="p-6">{children}</div>
    </div>
  );
};

export default NftCard;
