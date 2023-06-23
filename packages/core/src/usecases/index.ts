import { Data, Identity, Dataset, Task } from "../domain";
export { default as AddData } from "./AddDataUseCase";
export { default as CreateDataset } from "./CreateDatasetUseCase";
export { default as GetDataByDatasetId } from "./GetDataByDatasetIdUseCase";
export { default as GetDataset } from "./GetDatasetUseCase";
export { default as GetRawData } from "./GetRawDataUseCase";
export { default as GetTasks } from "./GetTasksUseCase";

export type UseCase<Payload, Result> = {
  execute: (payload: Payload) => Result;
};

export type AsyncUseCase<Payload, Result> = UseCase<Payload, Promise<Result>>;

export type AddDataUseCase = AsyncUseCase<Omit<Data, "id">, Identity>;
export type GetDataByDatasetIdUseCase = AsyncUseCase<Identity, Data[]>;

export type UpdateDataUseCase = AsyncUseCase<Data, Identity>;

export type CreateDatasetUseCase = AsyncUseCase<Omit<Dataset, "id">, Identity>;
export type GetDatasetUseCase = AsyncUseCase<Identity, Dataset[]>;

export type GetRawDataUseCase = AsyncUseCase<Identity, Buffer>;
export type GetTasksUseCase = AsyncUseCase<string, Task[]>;

export type UseCases = {
  addData: AddDataUseCase;
  createDataset: CreateDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDataset: GetDatasetUseCase;
  getRawData: GetRawDataUseCase;
  getTasks: GetTasksUseCase;
  updateData: UpdateDataUseCase;
};
