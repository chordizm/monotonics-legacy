import { Adapters, Query } from "../adapters";
import { Task } from "../domain";

export class TaskRepository {
  constructor(private readonly adapters: Adapters) {}
  async get(query?: Query<Task>): Promise<Task[]> {
    return this.adapters.gateways.task.get();
  }
}
