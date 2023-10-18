import { ImageView, Provider } from "../../containers";
import { Data } from "@monotonics/core";

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

const data: Omit<Data, "raw"> = {
  id: `data-1`,
  name: `Data 1`,
  date: new Date(),
  datasetId: `dataset-1`,
  mimeType: "image/jpeg",
  params: {},
  status: "done",
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
};

export const Default = {
  args: {
    data,
  },
  decorators: [
    (Story: any) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};
