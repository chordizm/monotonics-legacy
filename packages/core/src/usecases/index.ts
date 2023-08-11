import { Data, Identity, Dataset, Task } from "../domain";
export { default as AddData } from "./AddDataUseCase";
export { default as CreateDataset } from "./CreateDatasetUseCase";
export { default as GetDataByDatasetId } from "./GetDataByDatasetIdUseCase";
export { default as GetDataset } from "./GetDatasetUseCase";
export { default as GetDatasets } from "./GetDatasetsUseCase";
export { default as GetRawData } from "./GetRawDataUseCase";
export { default as GetTasks } from "./GetTasksUseCase";
export { default as UpdateData } from "./UpdateDataUseCase";

export type UseCase<Input, Output> = {
  execute: (input: Input) => Output;
};

export type AsyncUseCase<Input, Output> = UseCase<Input, Promise<Output>>;

export type AddDataUseCase = AsyncUseCase<Omit<Data, "id">, Identity>;
export type GetDataByDatasetIdUseCase = AsyncUseCase<Identity, Data[]>;

export type UpdateDataUseCase = AsyncUseCase<Data, Identity>;

export type CreateDatasetUseCase = AsyncUseCase<Omit<Dataset, "id">, Identity>;

export type GetDatasetsUseCase = AsyncUseCase<undefined, Dataset[]>;

export type GetDatasetUseCaseInput = {
  id: Identity;
};
export type GetDatasetUseCase = AsyncUseCase<GetDatasetUseCaseInput, Dataset>;

export type GetRawDataUseCaseInput = {
  id: Identity;
};
export type GetRawDataUseCase = AsyncUseCase<GetRawDataUseCaseInput, Buffer>;
export type GetTasksUseCaseInput = {
  mimeType: string;
};
export type GetTasksUseCase = AsyncUseCase<
  GetTasksUseCaseInput | undefined,
  Task[]
>;

export type UseCases = {
  addData: AddDataUseCase;
  createDataset: CreateDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDatasets: GetDatasetsUseCase;
  getDataset: GetDatasetUseCase;
  getRawData: GetRawDataUseCase;
  getTasks: GetTasksUseCase;
  updateData: UpdateDataUseCase;
};
