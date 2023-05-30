import Head from "next/head";
import { App } from "@monotonics/adapter_react";
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
      <App
        selectedId={selectedId}
        datasets={
          datasets.data?.pages[0].map(({ id, name, description, taskId }) => ({
            id,
            name,
            description,
            mimeType:
              tasks.data?.pages[0].find((task) => task.id === taskId)
                ?.mimeType ?? "",
          })) ?? []
        }
        data={data.data?.pages[0] ?? []}
        onClick={(id) => setSelectedId(id)}
        resolveUrl={() => "/_1ee8a886-9546-4f1c-ab96-72ca1f2e7f38.jpeg"}
        resolveData={() =>
          Promise.resolve({
            id: `data-0`,
            date: new Date(Date.now()),
            datasetId: `dataset-1`,
            name: `Data 1`,
            mimeType: "image/jpeg",
            params: {
              segments: Array.from({
                length: Math.floor(Math.random() * 500) + 1,
              }).map((_, i) => ({
                points: [
                  { x: Math.random() * 1024, y: Math.random() * 1024 },
                  { x: Math.random() * 1024, y: Math.random() * 1024 },
                  { x: Math.random() * 1024, y: Math.random() * 1024 },
                ],
                params: {
                  area: Math.floor(Math.random() * 1000),
                  perimeter: Math.floor(Math.random() * 1000),
                  radius: Math.floor(Math.random() * 1000),
                },
              })),
            },
          })
        }
      />
    </>
  );
}
