import { trpc } from "../utils/trpc";
import {
  useTasks,
  useDatasets,
  useData,
  useSelectedDatasetId,
  useSelectedDataUrl,
  useUseCases,
  useSelectedDataId,
} from "@monotonics/adapter_react";

import { useEffect, useState } from "react";

export const useTRPC = () => {
  const [, setDatasets] = useDatasets();
  const [, setUseCases] = useUseCases();
  const [, setTasks] = useTasks();
  const [initialized, setInitialized] = useState(false);
  const tasks = trpc.task.list.useQuery();
  const createDataset = trpc.dataset.create.useMutation();
  const datasets = trpc.dataset.list.useQuery();
  const addData = trpc.data.add.useMutation();
  const [, setData] = useData();
  const [, setDataUrl] = useSelectedDataUrl();
  const [datasetId] = useSelectedDatasetId();
  const [dataId] = useSelectedDataId();
  const dataUrl = trpc.data.getDataUrlById.useQuery({
    id: dataId ?? "",
  });
  const utils = trpc.useContext();
  useEffect(() => {
    let mounted = true;
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
      addData: {
        execute: (input) => {
          return addData.mutateAsync(input).then((res) => {
            utils.data.filterByDatasetId.invalidate().then(() => {
              console.log("[tRPC addData] Data invalidated.", data.data);
              setData(data.data ?? []);
            });
            return res;
          });
        },
      },
      getDataUrl: {
        execute: (id) => {
          setDataUrl(undefined);
          return utils.data.getDataUrlById.refetch({ id }).then((res) => {
            console.log("[tRPC getDataUrl] Data invalidated.", dataUrl.data);
            return dataUrl.data ?? "";
          });
        },
      },
    });
    if (!initialized) {
      Promise.all([tasks.refetch(), datasets.refetch()]).then((res) => {
        if (mounted) {
          setTasks(res[0].data?.flat() ?? []);
          setDatasets(res[1].data ?? []);
          setInitialized(true);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  const data = trpc.data.filterByDatasetId.useQuery({
    datasetId,
  });
  useEffect(() => {
    if (datasets.data) {
      setDatasets(datasets.data);
    }
  }, [datasets.data]);
  useEffect(() => {
    if (dataUrl.data) {
      setDataUrl(dataUrl.data);
    }
  }, [dataUrl.data]);
  useEffect(() => {
    console.debug("Data updated.", data.data);
    if (data.data) {
      setData(data.data);
    }
  }, [data]);
  useEffect(() => {
    console.log("refetching data", datasetId);
    utils.data.filterByDatasetId.invalidate();
  }, [datasetId]);
  return { initialized };
};
