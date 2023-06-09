import { CreateDatasetUseCase } from ".";
import { Dataset, Identity } from "../domain";
import { Services } from "../services";

export default class implements CreateDatasetUseCase {
  constructor(private readonly services: Services) {}

  async execute(dataset: Omit<Dataset, "id">): Promise<Identity> {
    return await this.services.repositories.dataset.add(dataset);
  }
}
