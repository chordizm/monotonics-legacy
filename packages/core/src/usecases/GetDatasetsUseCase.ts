import { AsyncUseCase } from ".";
import { Dataset } from "../domain";
import { Services } from "../services";

export type GetDatasetsUseCase = AsyncUseCase<undefined, Dataset[]>;

export default class implements GetDatasetsUseCase {
  constructor(private readonly services: Services) {}
  async execute(): Promise<Dataset[]> {
    return await this.services.repositories.dataset.get();
  }
}
