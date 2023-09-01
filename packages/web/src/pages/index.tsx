import { trpc } from "../utils/trpc";
import Head from "next/head";
import { Monotonics } from "@monotonics/adapter_react";

export default function Home() {
  const { data: datasets } = trpc.dataset.list.useInfiniteQuery({});
  const { data: tasks } = trpc.task.list.useInfiniteQuery({});
  const createDataset = trpc.dataset.create.useMutation();
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
        resolveDataPath={(id) => `/api/data/${id}`}
        onDatasetCreate={async (input) => {
          createDataset.mutateAsync(input).then(() => {
            ctx.dataset.invalidate();
          });
        }}
        onUpload={async (input) => {
          const formData = new FormData();
          formData.append("datasetId", input.datasetId);
          input.files.forEach((file) => {
            formData.append("files", file);
          });
          console.log("uploading", formData);
          fetch("/api/add-data", {
            method: "POST",
            body: formData,
          }).then(() => {
            console.log("done uploading");
            ctx.data.invalidate();
          });
        }}
      />
    </>
  );
}
