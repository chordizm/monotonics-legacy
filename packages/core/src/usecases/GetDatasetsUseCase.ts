import { GetDatasetsUseCase } from ".";
import { Dataset } from "../domain";
import { Services } from "../services";

export default class implements GetDatasetsUseCase {
  constructor(private readonly services: Services) {}
  async execute(): Promise<Dataset[]> {
    return await this.services.repositories.dataset.get();
  }
}
