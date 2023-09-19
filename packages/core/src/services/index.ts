import { BlobStorage } from "./BlobStorage";
import { DataRepository } from "./DataRepository";
import { DatasetRepository } from "./DatasetRepository";
import { RoleRepository } from "./RoleRepository";
import { TaskRepository } from "./TaskRepository";
import { TaskRunner } from "./TaskRunner";
import { UserRepository } from "./UserRepository";

export * from "./TaskRunner";
export * from "./DataRepository";
export * from "./DatasetRepository";
export * from "./TaskRepository";
export * from "./BlobStorage";
export * from "./UserRepository";
export * from "./RoleRepository";

export type Services = {
  taskRunner: TaskRunner;
  blobStorage: BlobStorage;
  repositories: {
    data: DataRepository;
    dataset: DatasetRepository;
    task: TaskRepository;
    user: UserRepository;
    role: RoleRepository;
  };
};
