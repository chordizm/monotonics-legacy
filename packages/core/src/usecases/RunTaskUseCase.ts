import { RunTaskUseCase, RunTaskUseCaseInput } from ".";
import { Services } from "../services";

export default class implements RunTaskUseCase {
  constructor(private readonly services: Services) {}

  async execute({ id, dataId }: RunTaskUseCaseInput): Promise<void> {
    return await this.services.taskRunner.run(id, dataId);
  }
}
