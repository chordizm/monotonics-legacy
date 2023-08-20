import { Adapters } from "../adapters";
import { getColors } from "../utils";
import {
  Dataset,
  Data as DomainData,
  Task,
  Identity,
  UseCases,
  AsyncUseCase,
} from "@monotonics/core";
import { Provider, atom, createStore } from "jotai";
import React from "react";

type Data = Omit<DomainData, "raw">;

const store = createStore();

const throwNotImplementedException = (name: string) => () => {
  throw new Error(`${name} is not implemented`);
};

export const useCasesAtom = atom<{
  createDataset: UseCases["createDataset"];
  getTasks: UseCases["getTasks"];
  addData: AsyncUseCase<
    { datasetId: Identity; data: string; name: string; params: {}; items: [] },
    Identity
  >;
  getDataUrl: AsyncUseCase<Identity, string>;
}>({
  createDataset: { execute: throwNotImplementedException("createDataset") },
  getTasks: { execute: throwNotImplementedException("getTasks") },
  addData: { execute: throwNotImplementedException("addData") },
  getDataUrl: { execute: throwNotImplementedException("getDataUrl") },
});

export const tasksAtom = atom<Task[]>([]);
store.set(tasksAtom, []);
export const datasetsAtom = atom<Dataset[]>([]);
store.set(datasetsAtom, []);
export const selectedDatasetIdAtom = atom<string | undefined>(undefined);
store.set(selectedDatasetIdAtom, undefined);
export const datasetAtom = atom<Dataset | undefined>((get) => {
  return get(datasetsAtom).find(({ id }) => id === get(selectedDatasetIdAtom));
});
export const mimeTypeAtom = atom<string | undefined>((get) => {
  const tasks = get(tasksAtom);
  const dataset = get(datasetAtom);
  const task = tasks.find(({ id }) => id === dataset?.taskId);
  return task?.mimeType;
});
export const dataAtom = atom<Omit<Data, "raw">[]>([]);
store.set(dataAtom, []);
export const selectedDataIdAtom = atom<string | undefined>(undefined);
store.set(selectedDataIdAtom, undefined);
export const selectedDataAtom = atom<Omit<Data, "raw"> | undefined>((get) => {
  return get(dataAtom).find(({ id }) => id === get(selectedDataIdAtom));
});
export const StoreProvider = (props: React.PropsWithChildren<{}>) => (
  <Provider store={store}>{props.children}</Provider>
);
export const selectedDataUrlAtom = atom<string | undefined>(undefined);
export const colorsAtom = atom<{ [key: string]: string }>((get) => {
  const data = get(selectedDataAtom);
  return getColors(data as DomainData);
});
export const selectedItemIndexAtom = atom<number | undefined>(undefined);
store.set(selectedItemIndexAtom, undefined);

export const deriveSelectedDataIdAtom = atom(
  (get) => {
    return get(selectedDataIdAtom);
  },
  (get, set, id: string | undefined) => {
    set(selectedDataIdAtom, id);
    set(selectedItemIndexAtom, undefined);
  }
);
