import { GetTasksUseCase } from ".";
import { Services } from "../services";

export default class implements GetTasksUseCase {
  constructor(private readonly services: Services) {}
  async execute() {
    return await this.services.repositories.task.get();
  }
}
