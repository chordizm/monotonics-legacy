import { Dialog, Form } from "@/components";
import { useTasks, useCreateDataset } from "@/store";
import { IconDatabasePlus } from "@tabler/icons-react";

export const DatasetCreateDialog = (_: {}) => {
  const [tasks] = useTasks();
  const [createDataset] = useCreateDataset();
  return (
    <Dialog
      icon={<IconDatabasePlus />}
      open={true}
      onClose={() => {}}
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
          createDataset.execute({
            name: values["name"].toString(),
            description: values["description"]?.toString() ?? "",
            taskId: values[2].toString(),
          });
        }}
      >
        Create dataset
      </Form>
    </Dialog>
  );
};
