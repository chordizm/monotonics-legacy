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
  resolveDataPath: (id: Identity) => string;
  onSelectedDatasetChange?: (datasetId: string) => void;
  onDatasetCreate?: (input: Omit<Dataset, "id">) => Promise<void>;
  onUpload?: (input: { datasetId: Identity; files: File[] }) => Promise<void>;
};

export const Monotonics = ({
  datasets,
  tasks,
  resolveData,
  resolveIndexes,
  resolveDataPath,
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
      {datasetId ? (
        <DataView
          datasetId={datasetId}
          resolveDataPath={resolveDataPath}
          resolveIndexes={resolveIndexes}
          resolveData={resolveData}
          onUpload={async (files) => {
            datasetId &&
              onUpload?.({
                datasetId,
                files,
              });
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Select a dataset
        </div>
      )}
    </AppShell>
  );
};
