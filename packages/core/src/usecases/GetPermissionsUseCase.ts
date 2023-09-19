import { Identity } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetPermissionsUseCaseInput = {
  id: Identity;
};

export type GetPermissionsUseCase = AsyncUseCase<
  GetPermissionsUseCaseInput,
  string[]
>;

export default class implements GetPermissionsUseCase {
  constructor(private readonly services: Services) {}

  async execute({ id }: GetPermissionsUseCaseInput): Promise<string[]> {
    const user = await this.services.repositories.user.get({
      filter: { id: { $eq: id } },
    });
    if (user.length !== 1) {
      throw new Error("user not found");
    }
    const { roleId } = user[0];
    const role = await this.services.repositories.role.get({
      filter: { id: { $eq: roleId } },
    });
    if (role.length !== 1) {
      throw new Error("role not found");
    }
    return role[0].permissions;
  }
}
