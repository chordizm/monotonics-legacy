import { Dialog, Form } from "@/components";
import { useServices, useTasks } from "@/store";
import { ActionIcon } from "@mantine/core";
import { CreateDataset } from "@monotonics/core";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const CreateDatasetButton = (_: {}) => {
  const services = useServices();
  const [tasks] = useTasks();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActionIcon size="xs" onClick={() => setOpen(true)}>
        <IconPlus />
      </ActionIcon>
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
              validate: (value) => {
                return null;
              },
            },
            {
              label: "Task",
              type: "select",
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
            const usecase = new CreateDataset(services);
            usecase
              .execute({
                name: values["name"].toString(),
                description: values["description"]?.toString() ?? "",
                taskId: values["taskId"]?.toString() ?? "",
              })
              .then(() => {
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
