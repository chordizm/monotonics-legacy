import { trpc } from "../utils/trpc";
import Head from "next/head";
import { Monotonics } from "@monotonics/adapter_react";
import { useState } from "react";
import { Identity } from "@monotonics/core";

export default function Home() {
  const [datasetId, setDatasetId] = useState<Identity>();
  const { data: datasets } = trpc.dataset.list.useInfiniteQuery({});
  const { data: tasks } = trpc.task.list.useInfiniteQuery({});
  const { data: indexes } = trpc.data.filterByDatasetId.useInfiniteQuery({
    datasetId,
  });
  const createDataset = trpc.dataset.create.useMutation();
  const upload = trpc.data.add.useMutation();
  const ctx = trpc.useContext();
  return (
    <>
      <Head>
        <title>MonoTonics</title>
        <meta name="description" content="MonoTonics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Monotonics
        tasks={tasks?.pages.flat() ?? []}
        datasets={datasets?.pages.flat() ?? []}
        indexes={indexes?.pages.flat() ?? []}
        resolveData={(id) => ctx.client.data.get.query({ id })}
        onSelectedDatasetChange={(id) => setDatasetId(id)}
        onDatasetCreate={async (input) => {
          createDataset.mutate(input);
        }}
        onUpload={async (input) => {
          datasetId &&
            upload.mutate({
              datasetId,
              name: input.name,
              data: input.data,
            });
        }}
      />
    </>
  );
}
