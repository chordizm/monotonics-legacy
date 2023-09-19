import { Dataset, Identity, Task } from "@monotonics/core";
import { Dialog, Form, IconButton, Input } from "../components";
import { IconDatabasePlus, IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export type CreateDatasetButtonProps = {
  tasks: Task[];
  onCreate?: (dataset: Omit<Dataset, "id">) => Promise<void>;
};

export const CreateDatasetButton = ({
  tasks,
  onCreate,
}: CreateDatasetButtonProps) => {
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState<Identity>();
  const inputs = useMemo(() => {
    console.log(tasks);
    const task = tasks.find((task) => task.id === taskId);
    console.log("Selected Task", task);
    const taskParams: Input[] = [];
    if (task?.options?.inputs) {
      task.options.inputs.forEach((input) => {
        taskParams.push({
          label: input.label,
          name: input.name,
          type: input.type as "text" | "select",
          options: input.options?.map((option) => ({
            value: option.value,
            label: option.label,
          })),
          validate: (value: string | number) => {
            return null;
          },
        });
      });
    }
    console.log("Task Parameter Inputs", taskParams);
    return taskParams;
  }, [taskId]);
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
            ...inputs,
          ]}
          onChange={(values) => {
            console.log(values);
            const taskId = values["taskId"]?.toString();
            if (taskId) {
              setTaskId(taskId);
            }
          }}
          onSubmit={(values) => {
            console.log("Create Dataset", values);
            onCreate?.({
              name: values["name"].toString(),
              description: values["description"]?.toString() ?? "",
              taskId: values["taskId"]?.toString() ?? "",
              params: Object.fromEntries(
                Object.keys(values)
                  .filter(
                    (key) =>
                      key !== "name" &&
                      key !== "description" &&
                      key !== "taskId"
                  )
                  .map((key) => [key, values[key]])
              ),
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
