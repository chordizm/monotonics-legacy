import { App } from "@/components";
import { Identity, Data } from "@monotonics/core";

export default {
  title: "Components/App",
  component: App,
};

const datasets: {
  id: Identity;
  name: string;
  description: string;
  mimeType: string;
}[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `dataset-${i}`,
  name: `Dataset ${i + 1}`,
  description: `Dataset ${i + 1} description`,
  mimeType: "image/jpeg",
}));

const data: Omit<Data, "raw" | "params">[] = Array.from({ length: 100 }).map(
  (_, i) => ({
    id: `data-${i}`,
    date: new Date(Date.now()),
    datasetId: `dataset-${i % 10}`,
    name: `Data ${i + 1}`,
    mimeType: "image/jpeg",
  })
);

export const Default = {
  args: {
    datasets,
    data,
    resolveUrl: () => "/_1ee8a886-9546-4f1c-ab96-72ca1f2e7f38.jpeg",
  },
};

export const ImageDataset = {
  args: {
    selectedId: "dataset-0",
    datasets,
    data,
    resolveUrl: () => "/_1ee8a886-9546-4f1c-ab96-72ca1f2e7f38.jpeg",
    resolveData: () =>
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
      }),
  },
};
