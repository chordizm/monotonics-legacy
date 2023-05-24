import { DataRepository } from "./DataRepository";
import { DatasetRepository } from "./DatasetRepository";
import { TaskRepository } from "./TaskRepository";
import { TaskRunner } from "./TaskRunner";

export * from "./TaskRunner";
export * from "./DataRepository";
export * from "./DatasetRepository";
export * from "./TaskRepository";

export type Services = {
  taskRunner: TaskRunner;
  repositories: {
    data: DataRepository;
    dataset: DatasetRepository;
    task: TaskRepository;
  };
};
