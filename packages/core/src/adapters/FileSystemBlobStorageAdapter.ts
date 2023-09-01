import { BlobStorageGateway } from "./gateway";
import fs from "fs";

export class FileSystemBlobStorageAdapter implements BlobStorageGateway {
  constructor(private readonly path: string) {}
  async createWriteStream(id: string): Promise<NodeJS.WritableStream> {
    const stream = fs.createWriteStream(`${this.path}/${id}`);
    stream.on("end", () => {
      stream.close();
    });
    return Promise.resolve(stream);
  }
  async createReadStream(
    id: string
  ): Promise<{ mimeType: string; stream: NodeJS.ReadableStream }> {
    const stream = fs.createReadStream(`${this.path}/${id}`);
    stream.on("end", () => {
      stream.close();
    });
    return Promise.resolve({ mimeType: "application/octet-stream", stream });
  }
}
