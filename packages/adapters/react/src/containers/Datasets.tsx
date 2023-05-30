import { useDatasets, useSelectedDatasetId } from "@/store";
import { NavLink } from "@/components";

export const Datasets = (_: {}) => {
  const [datasets] = useDatasets();
  const [selectedDatasetId, setSelectedDatasetId] = useSelectedDatasetId();
  return (
    <>
      {datasets.map(({ id, name, description }) => (
        <NavLink
          active={id === selectedDatasetId}
          key={id}
          label={name}
          description={description}
          onClick={() => setSelectedDatasetId(id)}
        />
      ))}
    </>
  );
};
