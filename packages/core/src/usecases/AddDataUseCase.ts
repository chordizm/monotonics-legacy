import { Data, Identity } from "../domain";
import { Services } from "../services";
import { AsyncUseCase } from ".";

export type AddDataUseCaseInput = {
  data: Omit<Data, "id">;
  stream: NodeJS.ReadableStream;
};

export type AddDataUseCase = AsyncUseCase<AddDataUseCaseInput, Identity>;

export default class implements AddDataUseCase {
  constructor(private readonly services: Services) {}

  async execute({ data, stream }: AddDataUseCaseInput): Promise<Identity> {
    return new Promise(async (resolve, reject) => {
      console.debug("Add UseCase executed.", data);
      const id = await this.services.repositories.data.add(data);
      const writeStream = await this.services.blobStorage.createWriteStream(id);
      stream.pipe(writeStream);
      stream.on("end", () => {
        resolve(id);
      });
      stream.on("error", (err) => {
        reject(err);
      });
    });
  }
}
