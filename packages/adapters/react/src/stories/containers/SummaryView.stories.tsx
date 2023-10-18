import { SummaryView, Provider } from "../../containers";
import { Data } from "@monotonics/core";

export default {
  title: "Containers/SummaryView",
  component: SummaryView,
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
  params: {
    "Average Area": "100",
    "Average Perimeter": "200",
    "Average Roundness": "0.5",
    "Average Count": "10",
  },
  status: "done",
  items: Array.from({ length: 100 }).map((_, j) => {
    const params = generateParams();
    return {
      ...params,
      labels: [params.roundness > 0.5 ? "circle" : "square"],
      points: Array.from({ length: 10 }).map((_, k) => [
        { x: k, y: Math.random() },
        { x: k + 1, y: Math.random() },
      ]),
      area: Math.random() * 1000,
      perimeter: Math.random() * 1000,
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
