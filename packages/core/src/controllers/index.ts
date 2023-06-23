import { Data, Dataset, Identity } from "../domain";

export type DatasetController = {
  create: (payload: Omit<Dataset, "id">) => Promise<Identity>;
  list: () => Promise<Dataset[]>;
  remove: (payload: Identity) => Promise<void>;
}

export type DataController = {
  add: (payload: Omit<Data, "id">) => Promise<Identity>;
  list: (payload: Identity) => Promise<Data[]>;
  remove: (payload: Identity) => Promise<void>;
}
