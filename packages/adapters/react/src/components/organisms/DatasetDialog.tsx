import { DatasetView, DatasetViewProps } from "./DatasetView";
import { IconDatabasePlus, IconDatabaseEdit } from "@tabler/icons-react";
import { Dialog, DialogProps } from "..";

export type DatasetDialogProps = Omit<DialogProps, "children" | "title"> &
  DatasetViewProps;

export const DatasetDialog = (props: DatasetDialogProps) => {
  const { open, onClose, ...datasetViewProps } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Dataset"
      icon={
        datasetViewProps.mode === "create" ? (
          <IconDatabasePlus />
        ) : (
          <IconDatabaseEdit />
        )
      }
    >
      <DatasetView {...datasetViewProps} />
    </Dialog>
  );
};
