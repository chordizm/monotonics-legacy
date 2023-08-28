import { AppShell } from "..";
import { CreateDatasetButton, Datasets, DataView } from ".";
import { IconDatabase } from "@tabler/icons-react";
import { Data, Dataset, Identity, Index, Task } from "@monotonics/core";

export type MonotonicsProps = {
  tasks: Task[];
  datasets: Dataset[];
  indexes: Index[];
  resolveData: (id: Identity) => Promise<Data>;
  onSelectedDatasetChange?: (datasetId: string) => void;
  onDatasetCreate?: (input: {
    name: string;
    description: string;
    taskId: Identity;
  }) => Promise<void>;
  onDataUpload?: (input: {
    datasetId: Identity;
    name: string;
    data: string;
  }) => Promise<void>;
};

export const Monotonics = ({
  datasets,
  tasks,
  indexes,
  resolveData,
  onSelectedDatasetChange,
  onDatasetCreate,
}: MonotonicsProps): JSX.Element => {
  return (
    <AppShell
      navbar={{
        title: "Dataset",
        icon: <IconDatabase size="1rem" />,
        action: (
          <CreateDatasetButton tasks={tasks} onCreate={onDatasetCreate} />
        ),
        content: (
          <Datasets datasets={datasets} onSelect={onSelectedDatasetChange} />
        ),
      }}
    >
      <DataView
        indexes={indexes}
        resolveData={resolveData}
        onUpload={() => {
          return Promise.resolve();
        }}
      />
    </AppShell>
  );
};
