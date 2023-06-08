import { Adapters } from "@/adapters";
import { Identity } from "@monotonics/core";

export class DataUrlProvider {
  constructor(private readonly adapters: Adapters) {}
  getDataUrl(id: Identity): string {
    return this.adapters.gateways.dataUrlResolver.resolve(id);
  }
}
