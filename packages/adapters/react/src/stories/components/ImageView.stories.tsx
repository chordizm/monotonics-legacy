import { ImageView } from "@/components";
import { Data } from "@monotonics/core";

export default {
  title: "Components/ImageView",
  component: ImageView,
};

const data: Omit<Data, "raw"> = {
  id: `data-0`,
  date: new Date(Date.now()),
  datasetId: `dataset-1`,
  name: `Data 1`,
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
};

export const Default = {
  args: {
    data,
    resolveUrl: () => "/_1ee8a886-9546-4f1c-ab96-72ca1f2e7f38.jpeg",
  },
};
