import { Adapters } from "../adapters";
import { getColors } from "../utils";
import {
  Dataset,
  Data as DomainData,
  Task,
  Services,
  TaskRunner,
  DataRepository,
  DatasetRepository,
  TaskRepository,
  Identity,
  UseCases,
} from "@monotonics/core";
import { Provider, atom, useAtom, createStore, useAtomValue } from "jotai";
import React from "react";

type Data = Omit<DomainData, "raw">;

const store = createStore();

const throwNotImplementedException = () => {
  throw new Error("Not implemented");
};

export const useCasesAtom = atom<{
  createDataset: UseCases["createDataset"];
  getTasks: UseCases["getTasks"];
}>({
  createDataset: { execute: throwNotImplementedException },
  getTasks: { execute: throwNotImplementedException },
});

export const UrlResolverAtom = atom<{ getUrl: (id: Identity) => string }>({
  getUrl: throwNotImplementedException,
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
export const dataAtom = atom<Data[]>([]);
store.set(dataAtom, []);
export const selectedDataIdAtom = atom<string | undefined>(undefined);
store.set(selectedDataIdAtom, undefined);
export const selectedDataAtom = atom<Data | undefined>((get) => {
  return get(dataAtom).find(({ id }) => id === get(selectedDataIdAtom));
});
export const StoreProvider = (props: React.PropsWithChildren<{}>) => (
  <Provider store={store}>{props.children}</Provider>
);
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
