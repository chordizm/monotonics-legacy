import { DatasetView } from "@/components";

export default {
  title: "Components/DatasetView",
  component: DatasetView,
};

const initialValues = {
  id: "1",
  name: "Dataset 1",
  description: "Dataset 1 description",
  taskId: "1",
};

const validate = {
  name: (value: string) => {
    if (!value) {
      return "Name is required";
    }
    return null;
  },
  description: (value: string) => {
    return null;
  },
  taskId: (value: string) => {
    if (!value) {
      return "Task is required";
    }
    return null;
  },
};

const tasks = [
  {
    id: "1",
    name: "Task 1",
    description: "Task 1 description",
    type: "image_classification",
  },
  {
    id: "2",
    name: "Task 2",
    description: "Task 2 description",
    type: "image_classification",
  },
];

export const Create = {
  args: {
    mode: "create",
    initialValues,
    validate,
    tasks,
  },
};

export const Edit = {
  args: {
    mode: "edit",
    initialValues,
    validate,
    tasks,
  },
};
