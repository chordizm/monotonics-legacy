import { Adapters, Query } from "../adapters";
import { Role } from "../domain";

export class RoleRepository {
  constructor(private readonly adapters: Adapters) {}
  async add(role: Omit<Role, "id">) {
    return this.adapters.gateways.role.add(role);
  }
  async get(query?: Query<Role>): Promise<Role[]> {
    return this.adapters.gateways.role.get();
  }
}
