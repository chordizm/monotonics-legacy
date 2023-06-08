import { GetRawDataUseCase } from ".";
import { Identity } from "../domain";
import { Services } from "../services";

export default class implements GetRawDataUseCase {
  constructor(private readonly services: Services) {}
  async execute(id: Identity): Promise<Buffer> {
    return this.services.repositories.data
      .get({ filter: { id: { $eq: id } } })
      .then((data) => data[0].raw);
  }
}
