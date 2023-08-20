import { Dialog, Form, IconButton } from "../components";
import { useUseCases, useTasks } from "../hooks";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const CreateDatasetButton = (_: {}) => {
  const [useCases] = useUseCases();
  const [tasks] = useTasks();
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => {
          useCases.getTasks.execute({}).then(() => {
            setOpen(true);
          });
        }}
      >
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
            useCases.createDataset
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
