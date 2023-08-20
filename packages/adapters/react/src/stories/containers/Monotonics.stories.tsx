import { action } from "@storybook/addon-actions";
import { Monotonics } from "../../containers";
import { Provider, createStore } from "jotai";
import {
  tasksAtom,
  datasetsAtom,
  selectedDatasetIdAtom,
  dataAtom,
  useCasesAtom,
} from "../../store";
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

const defaultStore = createStore();
defaultStore.set(useCasesAtom, {
  createDataset: {
    execute: () => {
      action("createDataset");
      return Promise.resolve("");
    },
  },
  getTasks: {
    execute: () => {
      action("getTasks");
      return Promise.resolve([]);
    },
  },
  addData: {
    execute: () => {
      action("addData");
      return Promise.resolve("");
    },
  },
  getDataUrl: { execute: async (id: Identity) => `/sample.jpg` },
});
defaultStore.set(datasetsAtom, datasets);
defaultStore.set(tasksAtom, tasks);
defaultStore.set(dataAtom, data);

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

const datasetSelectedStore = createStore();
datasetSelectedStore.set(datasetsAtom, datasets);
datasetSelectedStore.set(tasksAtom, tasks);
datasetSelectedStore.set(selectedDatasetIdAtom, "dataset-0");
export const DatasetSelected = {
  args: {},
  decorators: [
    (Story: any) => (
      <Provider store={datasetSelectedStore}>
        <Story />
      </Provider>
    ),
  ],
};
