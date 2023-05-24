import { Services } from "../services";

export class GetTaskUseCase {
  constructor(private readonly services: Services) {}
  async execute() {
    return await this.services.repositories.task.get();
  }
}
