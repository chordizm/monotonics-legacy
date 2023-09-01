import { BlobStorage } from "./BlobStorage";
import { DataRepository } from "./DataRepository";
import { DatasetRepository } from "./DatasetRepository";
import { TaskRepository } from "./TaskRepository";
import { TaskRunner } from "./TaskRunner";

export * from "./TaskRunner";
export * from "./DataRepository";
export * from "./DatasetRepository";
export * from "./TaskRepository";
export * from "./BlobStorage";

export type Services = {
  taskRunner: TaskRunner;
  blobStorage: BlobStorage;
  repositories: {
    data: DataRepository;
    dataset: DatasetRepository;
    task: TaskRepository;
  };
};
