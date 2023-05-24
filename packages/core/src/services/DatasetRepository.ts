import { Adapters, Query } from "../adapters";
import { Dataset, Identity } from "../domain";

export class DatasetRepository {
  constructor(private readonly adapters: Adapters) {}
  async add(Dataset: Omit<Dataset, "id">) {
    return this.adapters.gateways.dataset.add(Dataset);
  }
  async get(query?: Query<Dataset>) {
    return this.adapters.gateways.dataset.get(query);
  }
  async update(Dataset: Dataset) {
    return this.adapters.gateways.dataset.update(Dataset);
  }
  async delete(id: Identity) {
    return this.adapters.gateways.dataset.delete(id);
  }
}
