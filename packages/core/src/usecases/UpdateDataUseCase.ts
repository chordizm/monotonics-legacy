import { UpdateDataUseCase, UpdateDataUseCaseInput } from ".";
import { Identity, Data } from "../domain";
import { Services } from "../services";

export default class implements UpdateDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: UpdateDataUseCaseInput): Promise<Identity> {
    return await this.services.repositories.data.update(data);
  }
}
