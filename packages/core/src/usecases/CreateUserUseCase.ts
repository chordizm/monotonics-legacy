import { AsyncUseCase } from ".";
import { User, Identity } from "../domain";
import { Services } from "../services";

export type CreateUserUseCase = AsyncUseCase<Omit<User, "id">, Identity>;

export default class implements CreateUserUseCase {
  constructor(private readonly services: Services) {}

  async execute(user: Omit<User, "id">): Promise<Identity> {
    return await this.services.repositories.user.add(user);
  }
}
