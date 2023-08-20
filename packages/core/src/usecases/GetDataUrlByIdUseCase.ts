import { GetDataUrlByIdUseCase, GetDataUrlByIdUseCaseInput } from ".";
import { Services } from "../services";

export default class implements GetDataUrlByIdUseCase {
  constructor(private readonly services: Services) {}
  async execute({ id }: GetDataUrlByIdUseCaseInput): Promise<string> {
    return this.services.repositories.data
      .get({ filter: { id: { $eq: id } } })
      .then((data) => {
        console.log("id", id);
        console.log("data", data);
        return data.length === 1
          ? `data:${data[0].mimeType};base64,${data[0].raw.toString("base64")}`
          : "";
      });
  }
}
