import { Adapters, Query } from "../adapters";
import { Data, Identity } from "../domain";

export class DataRepository {
  constructor(private readonly adapters: Adapters) {}
  async add(data: Omit<Data, "id">) {
    return await this.adapters.gateways.data.add(data);
  }
  async get(query?: Query<Data>) {
    return this.adapters.gateways.data.get(query);
  }
  async update(data: {
    id: Data["id"];
    items: Data["items"];
    params: Data["params"];
  }) {
    return this.adapters.gateways.data.update(data);
  }
  async delete(id: Identity) {
    return this.adapters.gateways.data.delete(id);
  }
}
