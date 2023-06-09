import { ImageView } from "@/containers";
import { Provider, createStore } from "jotai";
import {
  dataAtom,
  selectedDataIdAtom,
  UrlResolverAtom
} from "@/store";
import { Data, Identity } from "@monotonics/core";

export default {
  title: "Containers/ImageView",
  component: ImageView,
};

const generateParams = () => {
  const area = Math.random() * 1000;
  const perimeter = Math.random() * 1000;
  const roundness = (4 * Math.PI * area) / Math.pow(perimeter, 2);
  return { area, perimeter, roundness };
};

const data: Omit<Data, "raw">[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `data-${i}`,
  name: `Data ${i + 1}`,
  date: new Date(),
  description: `Data ${i + 1} description`,
  datasetId: `dataset-${i}`,
  mimeType: "image/jpeg",
  params: {},
  items: Array.from({ length: 100 }).map((_, j) => {
    const params = generateParams();
    return {
      ...params,
      labels: [params.roundness > 0.8 ? "circle" : "square"],
      points: [
        { x: Math.random() * 300, y: Math.random() * 200 },
        { x: Math.random() * 300, y: Math.random() * 200 },
        { x: Math.random() * 300, y: Math.random() * 200 },
      ],
    };
  }),
}));

const defaultStore = createStore();
defaultStore.set(dataAtom, data);
defaultStore.set(selectedDataIdAtom, "data-0");
defaultStore.set(UrlResolverAtom, {
    getUrl: (id: Identity) => `/sample.jpg`,
});

export const Default = {
  args: {},
  decorators: [
    (Story: any) => (
      <Provider store={defaultStore}>
        <Story />
      </Provider>
    ),
  ],
};
