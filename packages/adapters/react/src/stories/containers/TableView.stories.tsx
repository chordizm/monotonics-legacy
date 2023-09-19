import { TableView, Provider } from "../../containers";
import { Data } from "@monotonics/core";

export default {
  title: "Containers/TableView",
  component: TableView,
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
      labels: [params.roundness > 0.5 ? "circle" : "square"],
      points: Array.from({ length: 10 }).map((_, k) => [
        { x: k, y: Math.random() },
        { x: k + 1, y: Math.random() },
      ]),
    };
  }),
}));

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
