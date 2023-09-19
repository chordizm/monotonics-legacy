import { User } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetUserByEmailUseCase = AsyncUseCase<
  string,
  Omit<User, "password">
>;

export default class implements GetUserByEmailUseCase {
  constructor(private readonly services: Services) {}
  async execute(email: string): Promise<Omit<User, "password">> {
    const users = await this.services.repositories.user.get({
      filter: { email: { $eq: email } },
    });
    if (users.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    return users[0];
  }
}
