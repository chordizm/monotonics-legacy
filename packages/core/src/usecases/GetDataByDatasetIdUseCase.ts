import { Data, Identity } from "../domain";
import { Services } from "../services";

export class GetDataByDatasetIdUseCase {
  constructor(private readonly services: Services) {}
  async execute(datasetId: Identity): Promise<Data[]> {
    return this.services.repositories.data.get({
      filter: { datasetId: { $eq: datasetId } },
    });
  }
}
