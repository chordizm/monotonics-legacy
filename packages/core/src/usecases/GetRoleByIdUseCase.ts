import { Role, Identity } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetRoleByIdUseCaseInput = {
  id: Role["id"];
};

export type GetRoleByIdUseCase = AsyncUseCase<GetRoleByIdUseCaseInput, Role>;

export default class implements GetRoleByIdUseCase {
  constructor(private readonly services: Services) {}

  async execute({ id }: GetRoleByIdUseCaseInput): Promise<Role> {
    return await this.services.repositories.role
      .get({
        filter: {
          id: { $eq: id },
        },
      })
      .then((roles) => {
        if (roles.length === 0) {
          throw new Error(`Role with id ${id} not found`);
        }
        return roles[0];
      });
  }
}
