import { AsyncUseCase } from ".";
import { User } from "../domain";
import { Services } from "../services";

export type SignInUseCaseInput = {
  email: string;
  password: string;
};

export type SignInUseCase = AsyncUseCase<
  SignInUseCaseInput,
  Omit<User, "password">
>;

export default class implements SignInUseCase {
  constructor(private readonly services: Services) {}

  async execute({
    email,
    password,
  }: SignInUseCaseInput): Promise<Omit<User, "password">> {
    console.log("[SignInUseCase] execute", { email, password });
    const users = await this.services.repositories.user.get({
      filter: { email: { $eq: email }, password: { $eq: password } },
    });
    console.log(users);
    if (users.length !== 1) {
      throw new Error("user not found");
    }
    const user = users[0];
    return user;
  }
}
