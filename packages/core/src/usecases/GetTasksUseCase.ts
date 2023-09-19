import { AsyncUseCase } from ".";
import { Task } from "../domain";
import { Services } from "../services";

export type GetTasksUseCaseInput = any;

export type GetTasksUseCase = AsyncUseCase<
  GetTasksUseCaseInput | undefined,
  Task[]
>;

export default class implements GetTasksUseCase {
  constructor(private readonly services: Services) {}
  async execute(input: GetTasksUseCaseInput | undefined) {
    const { mimeType } = input || {};
    return await this.services.repositories.task.get({
      filter: { mimeType: { $eq: mimeType } },
    });
  }
}
