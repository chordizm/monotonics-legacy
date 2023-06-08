import { Data, Identity, Dataset, Task } from "../domain";
export { default as AddData } from "./AddDataUseCase";
export { default as AddDataset } from "./AddDatasetUseCase";
export { default as GetDataById } from "./GetDataByDatasetIdUseCase";
export { default as GetDataset } from "./GetDatasetUseCase";
export { default as GetRawData } from "./GetRawDataUseCase";
export { default as GetTasks } from "./GetTasksUseCase";

export type UseCase<Payload, Result> = {
  execute: (payload: Payload) => Result;
};

export type AsyncUseCase<Payload, Result> = UseCase<Payload, Promise<Result>>;

export type AddDataUseCase = AsyncUseCase<Omit<Data, "id">, Identity>;
export type UpdateDataUseCase = AsyncUseCase<Pick<Data, "items">, Identity>;
export type GetDataByDatasetIdUseCase = AsyncUseCase<Identity, Data[]>;

export type AddDatasetUseCase = AsyncUseCase<Omit<Dataset, "id">, Identity>;
export type GetDatasetUseCase = AsyncUseCase<Identity, Dataset[]>;

export type GetRawDataUseCase = AsyncUseCase<Identity, Buffer>;
export type GetTasksUseCase = AsyncUseCase<Identity, Task[]>;

export type UseCases = {
  addData: AddDataUseCase;
  addDataset: AddDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDataset: GetDatasetUseCase;
  getRawData: GetRawDataUseCase;
  getTasks: GetTasksUseCase;
};
