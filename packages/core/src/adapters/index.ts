import { Data, Dataset, Task } from "../domain";
import {
  BlobStorageGateway,
  DatabaseGateway,
  TaskRunnerGateway,
} from "./gateway";

export * from "./gateway";

export * from "./FileSystemBlobStorageAdapter";

export type Adapters = {
  gateways: {
    taskRunner: TaskRunnerGateway;
    blobStorage: BlobStorageGateway;
    data: DatabaseGateway<Data>;
    dataset: DatabaseGateway<Dataset>;
    task: DatabaseGateway<Task>;
  };
  controllers: {};
  presenters: {};
};
