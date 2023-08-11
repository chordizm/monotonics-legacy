import { GetTasksUseCase, GetTasksUseCaseInput } from ".";
import { Services } from "../services";

export default class implements GetTasksUseCase {
  constructor(private readonly services: Services) {}
  async execute(input: GetTasksUseCaseInput | undefined) {
    const { mimeType } = input || {};
    return await this.services.repositories.task.get({
      filter: { mimeType: { $eq: mimeType } },
    });
  }
}
