import { Dialog, Form } from "@/components";
import { useServices } from "@/store";
import { CreateDataset } from "@monotonics/core";
import { IconDatabasePlus } from "@tabler/icons-react";

export const DatasetCreateDialog = (_: {}) => {
  const services = useServices();
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
        //   {
        //     label: "Task",
        //     type: "select",
        //     options: tasks.map((task) => ({
        //       value: task.id,
        //       label: task.name,
        //     })),
        //     validate: (value) => {
        //       if (value === "") {
        //         return "Task cannot be empty";
        //       }
        //       return null;
        //     },
        //   },
        ]}
        onSubmit={(values) => {
          const usecase = new CreateDataset(services);
          usecase.execute({
            name: values["name"].toString(),
            description: values["description"]?.toString() ?? "",
            mimeType: "image/*",
          });
        }}
      >
        Create dataset
      </Form>
    </Dialog>
  );
};
