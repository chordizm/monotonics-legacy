import { AsyncUseCase } from ".";
import { Role, Identity } from "../domain";
import { Services } from "../services";

export type CreateRoleUseCase = AsyncUseCase<Omit<Role, "id">, Identity>;

export default class implements CreateRoleUseCase {
  constructor(private readonly services: Services) {}

  async execute(role: Omit<Role, "id">): Promise<Identity> {
    return await this.services.repositories.role.add(role);
  }
}
