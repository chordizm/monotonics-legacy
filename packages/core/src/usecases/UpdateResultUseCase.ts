import { UpdateDataUseCase } from ".";
import { Identity, Data } from "../domain";
import { Services } from "../services";

export default class implements UpdateDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: Data): Promise<Identity> {
    return await this.services.repositories.data.update(data);
  }
}
