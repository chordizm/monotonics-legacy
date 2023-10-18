import { DataView, Provider } from "../../containers";
import { Task, Data, Dataset, Identity } from "@monotonics/core";

export default {
  title: "Containers/DataView",
  component: DataView,
};

const generateItemParams = () => {
  const area = Math.random() * 1000;
  const perimeter = Math.random() * 400;
  const roundness = (4 * Math.PI * area) / Math.pow(perimeter, 2);
  return { area, perimeter, roundness };
};

const generateDataParams = () => {
  const max = Math.random() * 1000;
  const min = Math.random() * 1000;
  const average = Math.random() * 1000;
  return { max, min, average };
};

const data: Omit<Data, "raw"> = {
  id: `data-1`,
  name: `Data 1`,
  date: new Date(),
  datasetId: `dataset-1`,
  mimeType: "image/jpeg",
  status: "done",
  items: Array.from({ length: 100 }).map((_, j) => {
    const params = generateItemParams();
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
  params: generateDataParams(),
};

const datasets: Dataset[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `dataset-${i}`,
  taskId: `task-${i}`,
  name: `Dataset ${i + 1}`,
  description: `Dataset ${i + 1} description`,
  mimeType: "image/jpeg",
  params: {},
}));
const tasks: Task[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `task-${i}`,
  name: `Task ${i + 1}`,
  description: `Task ${i + 1} description`,
  mimeType: "image/jpeg",
  options: {
    inputs: [],
    labels: [],
  },
}));

export const Default = {
  args: {
    tasks,
    datasets,
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
