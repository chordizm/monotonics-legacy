import { AppShell } from "..";
import { CreateDatasetButton, Datasets, DataView } from ".";
import { IconDatabase } from "@tabler/icons-react";
import { Data, Dataset, Identity, Index, Task } from "@monotonics/core";
import { useState } from "react";

export type MonotonicsProps = {
  tasks: Task[];
  datasets: Dataset[];
  resolveIndexes: (id: Identity) => Promise<Index[]>;
  resolveData: (id: Identity) => Promise<Data>;
  onSelectedDatasetChange?: (datasetId: string) => void;
  onDatasetCreate?: (input: {
    name: string;
    description: string;
    taskId: Identity;
  }) => Promise<void>;
  onUpload?: (input: {
    datasetId: Identity;
    name: string;
    type: string;
    data: string;
  }) => Promise<void>;
};

export const Monotonics = ({
  datasets,
  tasks,
  resolveData,
  resolveIndexes,
  onDatasetCreate,
  onUpload,
}: MonotonicsProps): JSX.Element => {
  const [datasetId, setDatasetId] = useState<Identity>();
  return (
    <AppShell
      navbar={{
        title: "Dataset",
        icon: <IconDatabase size="1rem" />,
        action: (
          <CreateDatasetButton tasks={tasks} onCreate={onDatasetCreate} />
        ),
        content: (
          <Datasets datasets={datasets} onSelect={(id) => setDatasetId(id)} />
        ),
      }}
    >
      <DataView
        datasetId={datasetId}
        resolveIndexes={resolveIndexes}
        resolveData={resolveData}
        onUpload={async (input) => {
          datasetId &&
            onUpload?.({
              ...input,
              datasetId,
            });
        }}
      />
    </AppShell>
  );
};
