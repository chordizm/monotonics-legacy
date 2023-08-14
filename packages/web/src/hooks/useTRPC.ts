import { trpc } from "../utils/trpc";
import {
  useTasks,
  useDatasets,
  useData,
  useSelectedDatasetId,
  useUseCases,
} from "@monotonics/adapter_react";

import { useEffect } from "react";

export const useTRPC = () => {
  const [, setUseCases] = useUseCases();
  const [, setTasks] = useTasks();
  const [, setDatasets] = useDatasets();
  const [, setData] = useData();
  const [datasetId] = useSelectedDatasetId();
  const tasks = trpc.task.list.useQuery();
  const datasets = trpc.dataset.list.useQuery();
  const data = trpc.data.filterByDataset.useInfiniteQuery({
    datasetId,
  });
  const createDataset = trpc.dataset.create.useMutation();
  useEffect(() => {
    if (datasets.data) {
      setDatasets(datasets.data);
    }
  }, [datasets.data]);
  useEffect(() => {
    if (data.data) {
      setData(data.data.pages.flat());
    }
  }, [data.data]);
  useEffect(() => {
    setUseCases({
      createDataset: {
        execute: (input) => {
          return createDataset.mutateAsync(input).then((id) => {
            datasets.refetch();
            return id;
          });
        },
      },
      getTasks: {
        execute: () => {
          return tasks.refetch().then((res) => {
            setTasks(res.data?.flat() ?? []);
            return res.data ?? [];
          });
        },
      },
    });
  }, []);
};
