import { Data, Identity, Dataset, Task } from "../domain";
export { default as AddData } from "./AddDataUseCase";
export { default as CreateDataset } from "./CreateDatasetUseCase";
export { default as GetDataByDatasetId } from "./GetDataByDatasetIdUseCase";
export { default as GetDataset } from "./GetDatasetUseCase";
export { default as GetDatasets } from "./GetDatasetsUseCase";
export { default as GetRawData } from "./GetDataUrlByIdUseCase";
export { default as GetTasks } from "./GetTasksUseCase";
export { default as GetDataUrlById } from "./GetDataUrlByIdUseCase";
export { default as UpdateData } from "./UpdateDataUseCase";
export { default as RunTask } from "./RunTaskUseCase";

export type UseCase<Input, Output> = {
  execute: (input: Input) => Output;
};

export type AsyncUseCase<Input, Output> = UseCase<Input, Promise<Output>>;

export type AddDataUseCase = AsyncUseCase<Omit<Data, "id">, Identity>;
export type GetDataByDatasetIdUseCase = AsyncUseCase<Identity, Data[]>;

export type UpdateDataUseCaseInput = {
  id: Data["id"];
  items: Data["items"];
  params: Data["params"];
};

export type UpdateDataUseCase = AsyncUseCase<UpdateDataUseCaseInput, Identity>;

export type CreateDatasetUseCase = AsyncUseCase<Omit<Dataset, "id">, Identity>;

export type GetDatasetsUseCase = AsyncUseCase<undefined, Dataset[]>;

export type GetDatasetUseCaseInput = {
  id: Identity;
};
export type GetDatasetUseCase = AsyncUseCase<GetDatasetUseCaseInput, Dataset>;

export type GetDataUrlByIdUseCaseInput = {
  id: Identity;
};
export type GetDataUrlByIdUseCase = AsyncUseCase<
  GetDataUrlByIdUseCaseInput,
  string
>;
export type GetTasksUseCaseInput = any;
export type GetTasksUseCase = AsyncUseCase<
  GetTasksUseCaseInput | undefined,
  Task[]
>;
export type RunTaskUseCaseInput = {
  id: Identity;
  dataId: Identity;
};
export type RunTaskUseCase = AsyncUseCase<RunTaskUseCaseInput, void>;

export type UseCases = {
  addData: AddDataUseCase;
  createDataset: CreateDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDatasets: GetDatasetsUseCase;
  getDataset: GetDatasetUseCase;
  getDataUrlById: GetDataUrlByIdUseCase;
  getTasks: GetTasksUseCase;
  runTask: RunTaskUseCase;
  updateData: UpdateDataUseCase;
};

const defaultUseCase: UseCase<any, any> = {
  execute: () => {
    throw new Error("Not implemented");
  },
};

export const useCases: UseCases = {
  addData: defaultUseCase,
  createDataset: defaultUseCase,
  getDataByDatasetId: defaultUseCase,
  getDatasets: defaultUseCase,
  getDataset: defaultUseCase,
  getDataUrlById: defaultUseCase,
  getTasks: defaultUseCase,
  runTask: defaultUseCase,
  updateData: defaultUseCase,
};
