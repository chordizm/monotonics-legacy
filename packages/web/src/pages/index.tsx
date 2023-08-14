import Head from "next/head";
import { Monotonics } from "@monotonics/adapter_react";
import { useTRPC } from "@/hooks";

export default function Home() {
  useTRPC();
  return (
    <>
      <Head>
        <title>MonoTonics</title>
        <meta name="description" content="MonoTonics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Monotonics />
    </>
  );
}
