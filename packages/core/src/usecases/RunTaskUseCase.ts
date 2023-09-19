import { AsyncUseCase } from ".";
import { Identity } from "../domain";
import { Services } from "../services";

export type RunTaskUseCaseInput = {
  id: Identity;
  dataId: Identity;
};
export type RunTaskUseCase = AsyncUseCase<RunTaskUseCaseInput, void>;

export default class implements RunTaskUseCase {
  constructor(private readonly services: Services) {}

  async execute({ id, dataId }: RunTaskUseCaseInput): Promise<void> {
    return await this.services.taskRunner.run(id, dataId);
  }
}
