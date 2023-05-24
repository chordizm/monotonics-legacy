import { Adapters } from "../adapters";
import { Identity } from "../domain";

export class TaskRunner {
  constructor(private readonly adapters: Adapters) {}
  async run(taskId: Identity, dataId: Identity) {
    return this.adapters.gateways.taskRunner.run(taskId, dataId);
  }
}
