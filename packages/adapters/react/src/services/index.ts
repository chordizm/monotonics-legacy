import { Services as CoreServices } from "@monotonics/core";
import { DataUrlProvider } from "./DataUrlProvider";

export type Services = CoreServices & {
  dataUrlProvider: DataUrlProvider;
};
