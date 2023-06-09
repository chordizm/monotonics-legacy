import { useDatasets, useSelectedDatasetId } from "@/store";
import {  NavLink } from "@/components";

export const Datasets = (_: {}) => {
  const [datasets] = useDatasets();
  const [selectedDatasetId, setSelectedDatasetId] = useSelectedDatasetId();

  return (
     <div>
        {datasets.map(({ id, name, description }) => (
          <NavLink
            key={id}
            label={name}
            description={description}
            active={id === selectedDatasetId}
            onClick={() => setSelectedDatasetId(id)}
          />
        ))}
      </div>
   
  );
};
