import EventEmitter from "events";
import { Identity, TaskRunnerGateway } from "@monotonics/core";
import { TaskNodePayload } from "../nodes/task";

export class NodeRedTaskRunner implements TaskRunnerGateway {
  constructor(private readonly emitter: EventEmitter) {}
  async run(taskId: Identity, dataId: Identity): Promise<void> {
    const payload: TaskNodePayload = {
      id: dataId,
    };
    this.emitter.emit(taskId, {
      payload,
    });
  }
}
