import { GetDataByDatasetIdUseCase } from ".";
import { Data, Identity } from "../domain";
import { Services } from "../services";

export default class implements GetDataByDatasetIdUseCase {
  constructor(private readonly services: Services) {}
  async execute(datasetId: Identity): Promise<Data[]> {
    console.debug("GetDataByDatasetIdUseCase executed.", datasetId);
    const data = this.services.repositories.data.get({
      filter: { datasetId: { $eq: datasetId } },
    });
    return data;
  }
}
