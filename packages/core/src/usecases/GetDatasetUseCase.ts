import { GetDatasetUseCase, GetDatasetUseCaseInput } from ".";
import { Dataset } from "../domain";
import { Services } from "../services";

export default class implements GetDatasetUseCase {
  constructor(private readonly services: Services) {}
  async execute({ id }: GetDatasetUseCaseInput): Promise<Dataset> {
    return await this.services.repositories.dataset
      .get({
        filter: { id: { $eq: id } },
      })
      .then((dataset) => {
        if (dataset.length === 0) {
          throw new Error(`Dataset with id ${id} not found`);
        }
        return dataset[0];
      });
  }
}
