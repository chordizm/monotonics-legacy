import { GetDatasetUseCase } from ".";
import { Dataset } from "../domain";
import { Services } from "../services";

export default class implements GetDatasetUseCase {
  constructor(private readonly services: Services) {}
  async execute(): Promise<Dataset[]> {
    return await this.services.repositories.dataset.get();
  }
}
