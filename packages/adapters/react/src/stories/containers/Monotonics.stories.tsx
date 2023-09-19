import { action } from "@storybook/addon-actions";
import { Monotonics, Provider } from "../../containers";
import { Data, Dataset, Identity, Task } from "@monotonics/core";

export default {
  title: "Containers/Monotonics",
  component: Monotonics,
};

const datasets: Dataset[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `dataset-${i}`,
  name: `Dataset ${i + 1}`,
  description: `Dataset ${i + 1} description`,
  taskId: "task-0",
}));
const tasks: Task[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `task-${i}`,
  name: `Task ${i + 1}`,
  description: `Task ${i + 1} description`,
  mimeType: "image/jpeg",
}));
const generateParams = () => {
  const area = Math.random() * 1000;
  const perimeter = Math.random() * 400;
  const roundness = (4 * Math.PI * area) / Math.pow(perimeter, 2);
  return { area, perimeter, roundness };
};

const data: Omit<Data, "raw">[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `data-${i}`,
  name: `Data ${i + 1}`,
  date: new Date(),
  description: `Data ${i + 1} description`,
  datasetId: `dataset-${i}`,
  mimeType: "image/jpeg",
  params: {},
  items:
    i % 2 === 0
      ? []
      : Array.from({ length: 100 }).map((_, j) => {
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

export const DatasetSelected = {
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
