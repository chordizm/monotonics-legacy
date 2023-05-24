import { Dataset } from "../domain";
import { Services } from "../services";

export class AddDatasetUseCase {
  constructor(private readonly services: Services) {}

  async execute(dataset: Omit<Dataset, "id">): Promise<void> {
    await this.services.repositories.dataset.add(dataset);
  }
}
