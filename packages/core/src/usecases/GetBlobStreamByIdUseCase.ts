import { AsyncUseCase } from ".";
import { Identity } from "../domain";
import { Services } from "../services";

export type GetBlobStreamByIdUseCaseInput = {
  id: Identity;
};
export type GetBlobStreamByIdUseCase = AsyncUseCase<
  GetBlobStreamByIdUseCaseInput,
  { mimeType: string; stream: NodeJS.ReadableStream }
>;

export default class implements GetBlobStreamByIdUseCase {
  constructor(private readonly services: Services) {}
  async execute({ id }: GetBlobStreamByIdUseCaseInput): Promise<{
    mimeType: string;
    stream: NodeJS.ReadableStream;
  }> {
    return this.services.blobStorage.createReadStream(id).then((res) => {
      if (res) return res;
      else {
        throw new Error("Not found");
      }
    });
  }
}
