import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { getAlchemyEndpoint } from "../../config/endpoints";

import * as React from "react";

export async function getServerSideProps(context: NextPageContext) {
  const alchemyEndpoint = getAlchemyEndpoint(process.env.ALCHEMY_API_KEY!);

  const { id } = context.query;
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  const country = await res.json();

  console.log(`Fetched place: ${country.name}`);
  return { props: { country } };
}

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query as { address: string };

  return (
    <div id="container" className="flex w-full flex-row p-6 px-10">
      {address}
    </div>
  );
};

export default CollectionPage;
