import { getColors } from "@/utils";
import {
  Dataset,
  Data as DomainData,
  Identity,
  Task,
  UseCases,
} from "@monotonics/core";
import { Provider, atom, useAtom, createStore, useAtomValue } from "jotai";
import React from "react";

type Data = Omit<DomainData, "raw">;

const store = createStore();

export const useCasesAtom = atom<UseCases>({} as any);

export type GetImageAdapter = {
  execute: (id: Identity) => string;
};
export const getImageUrlAtom = atom<GetImageAdapter>({
  execute: () => "",
});
export type CreateDatasetAdapter = {
  execute: (dataset: Omit<Dataset, "id">) => Promise<Dataset>;
};
export const createDatasetAtom = atom<CreateDatasetAdapter>({
  execute: () => Promise.resolve({} as Dataset),
});
store.set(getImageUrlAtom, { execute: () => "" });
export const tasksAtom = atom<Task[]>([]);
store.set(tasksAtom, []);
export const datasetsAtom = atom<Dataset[]>([]);
store.set(datasetsAtom, []);
export const selectedDatasetIdAtom = atom<string | undefined>(undefined);
store.set(selectedDatasetIdAtom, undefined);
export const datasetAtom = atom<Dataset | undefined>((get) => {
  return get(datasetsAtom).find(({ id }) => id === get(selectedDatasetIdAtom));
});
export const taskAtom = atom<Task | undefined>((get) => {
  return get(tasksAtom).find(({ id }) => id === get(datasetAtom)?.taskId);
});
export const mimeTypeAtom = atom<string | undefined>((get) => {
  return get(taskAtom)?.mimeType;
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

const deriveSelectedDataIdAtom = atom(
  (get) => {
    return get(selectedDataIdAtom);
  },
  (get, set, id: string | undefined) => {
    set(selectedDataIdAtom, id);
    set(selectedItemIndexAtom, undefined);
  }
);

export const useDatasets = () => useAtom(datasetsAtom);
export const useSelectedDatasetId = () => useAtom(selectedDatasetIdAtom);
export const useData = () => useAtom(dataAtom);
export const useTasks = () => useAtom(tasksAtom);
export const useTask = () => useAtom(taskAtom);
export const useMimeType = () => useAtom(mimeTypeAtom);
export const useSelectedDataId = () => useAtom(deriveSelectedDataIdAtom);
export const useSelectedData = () => useAtom(selectedDataAtom);
export const useColors = () => useAtom(colorsAtom);
export const useSelectedItemIndex = () => useAtom(selectedItemIndexAtom);

export const useGetImageURL = () => useAtom(getImageUrlAtom);
export const useCreateDataset = () => useAtom(createDatasetAtom);
export const useUseCases = () => useAtomValue(useCasesAtom);