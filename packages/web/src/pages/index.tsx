import Head from "next/head";
import { Monotonics } from "@monotonics/adapter_react";
import { Identity } from "@monotonics/core";
import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function Home() {
  const [selectedId, setSelectedId] = useState<Identity | undefined>(undefined);
  const tasks = trpc.task.list.useInfiniteQuery({});
  const datasets = trpc.dataset.list.useInfiniteQuery({});
  const data = trpc.data.filterByDataset.useInfiniteQuery({
    datasetId: selectedId ?? "",
  });
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
