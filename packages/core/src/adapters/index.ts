import { Data, Dataset, Task } from "../domain";
import { DatabaseGateway, TaskRunnerGateway } from "./gateway";

export * from "./gateway";

export type Adapters = {
  gateways: {
    taskRunner: TaskRunnerGateway;
    data: DatabaseGateway<Data>;
    dataset: DatabaseGateway<Dataset>;
    task: DatabaseGateway<Task>;
  };
  controllers: {};
  presenters: {};
};
