import { GetDataByIdUseCase, GetDataByIdUseCaseInput } from ".";
import { Data } from "../domain";
import { Services } from "../services";

export default class implements GetDataByIdUseCase {
  constructor(private readonly services: Services) {}
  async execute({ id }: GetDataByIdUseCaseInput): Promise<Data> {
    return this.services.repositories.data
      .get({ filter: { id: { $eq: id } } })
      .then((data) => {
        console.log("id", id);
        console.log("data", data);
        if (data.length === 0) throw new Error("Data not found.");
        return data[0];
      });
  }
}
