import { Identity, Task } from "@monotonics/core";
import { Dialog, Form, IconButton } from "../components";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export type CreateDatasetButtonProps = {
  tasks: Task[];
  onCreate?: (item: {
    name: string;
    description: string;
    taskId: Identity;
  }) => Promise<void>;
};

export const CreateDatasetButton = ({
  tasks,
  onCreate,
}: CreateDatasetButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <IconPlus size="1rem" />
      </IconButton>
      <Dialog
        icon={<IconDatabasePlus />}
        open={open}
        onClose={() => setOpen(false)}
        title="Create Dataset"
      >
        <Form
          inputs={[
            {
              label: "Dataset Name",
              type: "text",
              name: "name",
              validate: (value) => {
                if (value === "") {
                  return "Dataset name cannot be empty";
                }
                return null;
              },
            },
            {
              label: "Dataset Description",
              type: "text",
              name: "description",
              validate: (value) => {
                return null;
              },
            },
            {
              label: "Task",
              type: "select",
              name: "taskId",
              options: tasks.map((task) => ({
                value: task.id,
                label: task.name,
              })),
              validate: (value) => {
                if (value === "") {
                  return "Task cannot be empty";
                }
                return null;
              },
            },
          ]}
          onSubmit={(values) => {
            onCreate?.({
              name: values["name"].toString(),
              description: values["description"]?.toString() ?? "",
              taskId: values["taskId"]?.toString() ?? "",
            }).then(() => {
              setOpen(false);
            });
          }}
        >
          Create dataset
        </Form>
      </Dialog>
    </>
  );
};
