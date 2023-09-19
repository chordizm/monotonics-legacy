import { Identity, User } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetUserByIdUseCaseInput = {
  id: Identity;
};

export type GetUserByIdUseCase = AsyncUseCase<
  GetUserByIdUseCaseInput,
  Omit<User, "password">
>;

export default class implements GetUserByIdUseCase {
  constructor(private readonly services: Services) {}
  async execute(
    input: GetUserByIdUseCaseInput
  ): Promise<Omit<User, "password">> {
    const { id } = input || {};
    return await this.services.repositories.user
      .get({
        filter: { id: { $eq: id } },
      })
      .then((users) => {
        if (users.length === 0) {
          throw new Error(`User with id ${id} not found`);
        }
        return users[0];
      });
  }
}
