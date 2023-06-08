import { AddDataUseCase } from ".";
import { Data, Identity } from "../domain";
import { Services } from "../services";

export default class implements AddDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: Omit<Data, "id">): Promise<Identity> {
    const id = await this.services.repositories.data.add(data);
    const { datasetId } = data;
    const { taskId } = await this.services.repositories.dataset
      .get({ filter: { id: { $eq: datasetId } } })
      .then((datasets) => datasets[0]);
    await this.services.taskRunner.run(taskId, id);
    return id;
  }
}
