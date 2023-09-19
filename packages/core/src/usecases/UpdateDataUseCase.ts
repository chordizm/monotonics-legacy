import { AsyncUseCase } from ".";
import { Identity, Data } from "../domain";
import { Services } from "../services";

export type UpdateDataUseCaseInput = {
  id: Data["id"];
  items: Data["items"];
  params: Data["params"];
};

export type UpdateDataUseCase = AsyncUseCase<UpdateDataUseCaseInput, Identity>;

export default class implements UpdateDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: UpdateDataUseCaseInput): Promise<Identity> {
    return await this.services.repositories.data.update(data);
  }
}
