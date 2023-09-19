import { Role } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type GetRolesUseCase = AsyncUseCase<any, Role[]>;

export default class implements GetRolesUseCase {
  constructor(private readonly services: Services) {}
  async execute(): Promise<Role[]> {
    return await this.services.repositories.role.get();
  }
}
