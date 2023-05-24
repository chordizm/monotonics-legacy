import {
  Center,
  Select,
  Button,
  TextInput,
  CopyButton,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dataset, Task } from "@monotonics/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export type DatasetViewProps = {
  mode: "create" | "edit";
  initialValues: Dataset;
  tasks: Task[];
  validate: { [K in keyof Dataset]: (value: Dataset[K]) => string | null };
  onChange?: (dataset: Dataset) => void;
};

export const DatasetView = (props: DatasetViewProps) => {
  const { mode, initialValues, validate, tasks, onChange } = props;
  const form = useForm({
    initialValues,
    validate,
  });
  return (
    <form
      onChange={form.onSubmit((values) =>
        onChange?.({
          id: initialValues.id,
          name: values.name,
          description: values.description,
          taskId: values.taskId,
        })
      )}
    >
      {mode !== "create" && (
        <TextInput
          readOnly
          label="ID"
          value={initialValues.id}
          style={{ marginBottom: 15 }}
          rightSection={
            <CopyButton value={initialValues.id}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : "Copy"}
                  withArrow
                  position="right"
                >
                  <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                    {copied ? (
                      <IconCheck size="1rem" />
                    ) : (
                      <IconCopy size="1rem" />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          }
        />
      )}
      <TextInput
        required
        label="Name"
        placeholder="Enter dataset name"
        value={form.values.name}
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        error={form.errors.name}
        description="Dataset name should be unique and descriptive"
        style={{ marginBottom: 15 }}
      />
      <TextInput
        label="Description"
        placeholder="Enter dataset description"
        value={form.values.description}
        onChange={(event) =>
          form.setFieldValue("description", event.currentTarget.value)
        }
        error={form.errors.description}
        description="Dataset description is optional"
        style={{ marginBottom: 15 }}
      />
      <Select
        required
        label="Task"
        placeholder="Select task"
        value={form.values.taskId}
        onChange={(value) => value && form.setFieldValue("taskId", value)}
        error={form.errors.taskId}
        data={tasks.map((task) => ({ value: task.id, label: task.name }))}
        style={{ marginBottom: 15 }}
      />
      <Center>
        {mode === "create" ? (
          <Button type="submit" variant="light" color="blue">
            Create dataset
          </Button>
        ) : (
          <Button type="submit" variant="light" color="blue">
            Save changes
          </Button>
        )}
      </Center>
    </form>
  );
};
