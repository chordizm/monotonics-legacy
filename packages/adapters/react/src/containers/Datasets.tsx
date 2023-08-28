import { NavLink } from "../components";
import { Dataset, Identity } from "@monotonics/core";

export type DatasetsProps = {
  datasets: Dataset[];
  selectedDatasetId?: Identity;
  onSelect?: (datasetId: Identity) => void;
};

export const Datasets = ({
  datasets,
  selectedDatasetId,
  onSelect,
}: DatasetsProps) => {
  return (
    <div>
      {datasets.map(({ id, name, description }) => (
        <NavLink
          key={id}
          label={name}
          description={description}
          active={id === selectedDatasetId}
          onClick={() => onSelect?.(id)}
        />
      ))}
    </div>
  );
};
