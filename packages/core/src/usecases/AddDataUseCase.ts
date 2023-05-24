import { Data, Identity } from "../domain";
import { Services } from "../services";

export class AddDataUseCase {
  constructor(private readonly services: Services) {}

  async execute(data: Omit<Data, "id">): Promise<Identity> {
    const { id, datasetId } = await this.services.repositories.data.add(data);
    const { taskId } = await this.services.repositories.dataset
      .get({ filter: { id: { $eq: datasetId } } })
      .then((datasets) => datasets[0]);
    await this.services.taskRunner.run(taskId, id);
    return id;
  }
}
