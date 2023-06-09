import { AddDataUseCase } from ".";
import { Data, Identity } from "../domain";
import { Services } from "../services";

export default class implements AddDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: Omit<Data, "id">): Promise<Identity> {
    return await this.services.repositories.data.add(data);
  }
}
