import { User } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetUsersUseCaseInput =
  | {
      status: string;
    }
  | any;

export type GetUsersUseCase = AsyncUseCase<
  GetUsersUseCaseInput,
  Omit<User, "password">[]
>;

export default class implements GetUsersUseCase {
  constructor(private readonly services: Services) {}
  async execute(
    input: GetUsersUseCaseInput
  ): Promise<Omit<User, "password">[]> {
    console.log("[GetUsersUseCase] execute", { input });
    const { status } = input || {};
    return await this.services.repositories.user
      .get({
        filter: { status: { $eq: status } },
      })
      .finally(() => {
        console.log("[GetUsersUseCase] finally");
      });
  }
}
