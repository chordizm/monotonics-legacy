import { Button, Dialog, FileInput, IconButton } from "../components";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export type AddDataButtonProps = {
  onUpload?: (files: File[]) => Promise<void>;
};

export const AddDataButton = ({ onUpload }: AddDataButtonProps) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconPlus size="1rem" />
      </IconButton>
      <Dialog
        title="Add Data"
        icon={<IconDatabasePlus />}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        >
          <FileInput
            value={files}
            multiple
            onChange={(files) =>
              setFiles((prev) => [...prev, ...(files as File[])])
            }
          />
          <Button
            type="button"
            disabled={files.length === 0}
            onClick={() => {
              onUpload?.(files);
              setOpen(false);
            }}
          >
            Upload
          </Button>
        </div>
      </Dialog>
    </>
  );
};
