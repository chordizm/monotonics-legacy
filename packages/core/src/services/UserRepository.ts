import { Adapters, Query } from "../adapters";
import { Identified, User } from "../domain";

export class UserRepository {
  constructor(private readonly adapters: Adapters) {}
  async add(user: Omit<User, "id">) {
    const hash = await this.adapters.gateways.hasher.hash(user.password);
    return this.adapters.gateways.user.add({
      ...user,
      password: hash,
    });
  }
  async get(query?: Query<User>): Promise<Omit<User, "password">[]> {
    const password = query?.filter?.password?.$eq;
    return this.adapters.gateways.user
      .get(query)
      .then((users) =>
        password === undefined
          ? users
          : users.filter(
              async (u) =>
                await this.adapters.gateways.hasher.compare(
                  password,
                  u.password
                )
            )
      )
      .then((users) => users.map(({ password, ...user }) => user));
  }
  async update(user: Identified & Partial<Omit<User, "id">>) {
    if (user.password) {
      const hash = await this.adapters.gateways.hasher.hash(user.password);
      return this.adapters.gateways.user.update({
        ...user,
        password: hash,
      });
    }
    return this.adapters.gateways.user.update(user);
  }
}
