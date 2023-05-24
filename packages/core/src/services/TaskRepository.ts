import { Adapters } from "../adapters";
import { Task } from "../domain";

export class TaskRepository {
  constructor(private readonly adapters: Adapters) {}
  async get(): Promise<Task[]> {
    return this.adapters.gateways.task.get();
  }
}
