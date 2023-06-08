import { Services } from "@/services";
import { Identity } from "@monotonics/core";
import { GetDataUrlUseCase } from ".";

export default class implements GetDataUrlUseCase {
  constructor(private readonly services: Services) {}
  execute(id: Identity): string {
    return this.services.dataUrlProvider.getDataUrl(id);
  }
}
