import { Button, Dialog, FileInput, IconButton } from "../components";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useUseCases } from "../hooks";

export type AddDataButtonProps = {
  datasetId: string;
};

export const AddDataButton = ({ datasetId }: AddDataButtonProps) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [useCases] = useUseCases();
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
              files.forEach((file) => {
                file.arrayBuffer().then((raw) => {
                  const data = btoa(
                    new Uint8Array(raw).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  );
                  useCases.addData.execute({
                    datasetId,
                    name: file.name,
                    data: `${file.type};base64,${data}`,
                    params: {},
                    items: [],
                  });
                });
              });

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
