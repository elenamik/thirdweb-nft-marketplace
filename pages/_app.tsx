import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider desiredChainId={4}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
