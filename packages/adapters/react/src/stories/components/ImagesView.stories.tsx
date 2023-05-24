import { ImagesView } from "@/components";
import { Data } from "@monotonics/core";

export default {
  title: "Components/ImagesView",
  component: ImagesView,
};

const data: Omit<Data, "raw">[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `data-${i}`,
  date: new Date(Date.now()),
  datasetId: `dataset-${i % 10}`,
  name: `Data ${i + 1}`,
  mimeType: "image/jpeg",
  params: {
    segments: Array.from({ length: Math.floor(Math.random() * 500) + 1 }).map(
      (_, i) => ({
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
      })
    ),
  },
}));

export const Default = {
  args: {
    data,
    resolveUrl: () => "/_1ee8a886-9546-4f1c-ab96-72ca1f2e7f38.jpeg",
  },
};
