import { AddDataUseCase } from "./AddDataUseCase";
import { AddDatasetUseCase } from "./AddDatasetUseCase";
import { GetDataByDatasetIdUseCase } from "./GetDataByDatasetIdUseCase";
import { GetDatasetUseCase } from "./GetDatasetUseCase";
import { GetRawDataUseCase } from "./GetRawDataUseCase";
import { GetTaskUseCase } from "./GetTaskUseCase";

export * from "./AddDataUseCase";
export * from "./AddDatasetUseCase";
export * from "./GetDataByDatasetIdUseCase";
export * from "./GetDatasetUseCase";
export * from "./GetRawDataUseCase";
export * from "./GetTaskUseCase";

export type UseCases = {
  addData: AddDataUseCase;
  addDataset: AddDatasetUseCase;
  getDataByDatasetId: GetDataByDatasetIdUseCase;
  getDataset: GetDatasetUseCase;
  getRawData: GetRawDataUseCase;
  getTask: GetTaskUseCase;
};
