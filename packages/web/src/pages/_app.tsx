import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import React from "react";
import { Provider } from "@monotonics/adapter_react";
import "split-pane-react/esm/themes/default.css";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps>;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Layout = (({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}) as AppType;

export default trpc.withTRPC(Layout);
