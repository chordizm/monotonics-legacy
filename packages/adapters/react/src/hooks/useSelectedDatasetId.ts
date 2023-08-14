import { selectedDatasetIdAtom } from "../store";
import { useAtom } from "jotai";

export const useSelectedDatasetId = () => useAtom(selectedDatasetIdAtom);
