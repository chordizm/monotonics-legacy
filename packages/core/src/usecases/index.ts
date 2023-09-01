import { Data, Identity, Dataset, Task } from "../domain";
export { default as AddData } from "./AddDataUseCase";
export { default as CreateDataset } from "./CreateDatasetUseCase";
export { default as GetDataByDatasetId } from "./GetDataByDatasetIdUseCase";
export { default as GetDataset } from "./GetDatasetUseCase";
export { default as GetDatasets } from "./GetDatasetsUseCase";
export { default as GetRawData } from "./GetDataByIdUseCase";
export { default as GetTasks } from "./GetTasksUseCase";
export { default as GetDataById } from "./GetDataByIdUseCase";
export { default as UpdateData } from "./UpdateDataUseCase";
export { default as RunTask } from "./RunTaskUseCase";
export { default as GetBlobStreamById } from "./GetBlobStreamByIdUseCase";

export type UseCase<Input, Output> = {
  execute: (input: Input) => Output;
};

export type AsyncUseCase<Input, Output> = UseCase<Input, Promise<Output>>;

export type AddDataUseCaseInput = {
  data: Omit<Data, "id">;
  stream: NodeJS.ReadableStream;
};

export type AddDataUseCase = AsyncUseCase<AddDataUseCaseInput, Identity>;
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

export type GetDataByIdUseCaseInput = {
  id: Identity;
};
export type GetDataByIdUseCase = AsyncUseCase<GetDataByIdUseCaseInput, Data>;

export type GetBlobStreamByIdUseCaseInput = {
  id: Identity;
};
export type GetBlobStreamByIdUseCase = AsyncUseCase<
  GetBlobStreamByIdUseCaseInput,
  { mimeType: string; stream: NodeJS.ReadableStream }
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
  getDataById: GetDataByIdUseCase;
  getBlobStreamById: GetBlobStreamByIdUseCase;
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
  getDataById: defaultUseCase,
  getBlobStreamById: defaultUseCase,
  getTasks: defaultUseCase,
  runTask: defaultUseCase,
  updateData: defaultUseCase,
};
