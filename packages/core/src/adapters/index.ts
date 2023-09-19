import { Data, Dataset, Role, Task, User } from "../domain";
import {
  Query,
  BlobStorageGateway,
  DatabaseGateway,
  TaskRunnerGateway,
  HasherGateway,
} from "./gateway";

export * from "./gateway";

export * from "./FileSystemBlobStorageAdapter";

export type Adapters = {
  gateways: {
    hasher: HasherGateway;
    taskRunner: TaskRunnerGateway;
    blobStorage: BlobStorageGateway;
    data: DatabaseGateway<Data>;
    dataset: DatabaseGateway<Dataset>;
    task: DatabaseGateway<Task>;
    user: DatabaseGateway<User>;
    role: DatabaseGateway<Role>;
  };
};
