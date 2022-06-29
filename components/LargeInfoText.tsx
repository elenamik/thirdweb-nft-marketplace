import * as React from "react";

export const LargeInfoText: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="p-6 font-josephin text-2xl font-semibold">{message}</div>
  );
};

export default LargeInfoText;
