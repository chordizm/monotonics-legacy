import { Adapters as CoreAdapters } from "@monotonics/core";
import { DataUrlResolver } from "./gateways";

export type Adapters = {
  gateways: CoreAdapters["gateways"] & {
    dataUrlResolver: DataUrlResolver;
  };
  controllers: CoreAdapters["controllers"];
  presenters: CoreAdapters["presenters"];
};
