import { GetTasksUseCase } from ".";
import { Services } from "../services";

export default class implements GetTasksUseCase {
  constructor(private readonly services: Services) {}
  async execute(mimeType: string) {
    return await this.services.repositories.task.get({
        filter: { mimeType: { $eq: mimeType } }
    });
  }
}
