import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import React, { useEffect } from "react";
import { Provider } from "@monotonics/adapter_react";
import { SessionProvider, useSession } from "next-auth/react";
import "split-pane-react/esm/themes/default.css";
import "../../styles/global.css";
import { useRouter } from "next/router";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps>;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return null;
  }
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }
  return <>{children}</>;
};

const Layout = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  return (
    <SessionProvider session={session}>
      <Provider>
        {(Component as any).auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(Layout);
