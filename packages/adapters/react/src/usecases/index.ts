import { UseCases as CoreUseCases, Identity, UseCase } from "@monotonics/core";
export { default as GetDataUrl } from "./GetDataUrlUseCase";

export type GetDataUrlUseCase = UseCase<Identity, string>;

export type UseCases = CoreUseCases & {
  getDataUrl: GetDataUrlUseCase;
};
