import { Adapters } from "../adapters";
import { Identity } from "../domain";

export class BlobStorage {
  constructor(private readonly adapters: Adapters) {}
  async createWriteStream(id: Identity): Promise<NodeJS.WritableStream> {
    return this.adapters.gateways.blobStorage.createWriteStream(id);
  }
  async createReadStream(
    id: Identity
  ): Promise<{ mimeType: string; stream: NodeJS.ReadableStream }> {
    return this.adapters.gateways.blobStorage.createReadStream(id);
  }
}
