import { trpc } from "../utils/trpc";
import Head from "next/head";
import { Monotonics } from "@monotonics/adapter_react";

export default function Home() {
  const { data: datasets } = trpc.dataset.list.useInfiniteQuery({});
  const { data: tasks } = trpc.task.list.useInfiniteQuery({});
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
        resolveData={(id) => ctx.client.data.get.query({ id })}
        resolveIndexes={(datasetId) =>
          ctx.client.data.list.query({ datasetId })
        }
        onDatasetCreate={async (input) => {
          createDataset.mutateAsync(input).then(() => {
            ctx.dataset.invalidate();
          });
        }}
        onUpload={async (input) => {
          upload
            .mutateAsync({
              datasetId: input.datasetId,
              name: input.name,
              type: input.type,
              data: input.data,
            })
            .then(() => {
              ctx.data.invalidate();
            });
        }}
      />
    </>
  );
}
