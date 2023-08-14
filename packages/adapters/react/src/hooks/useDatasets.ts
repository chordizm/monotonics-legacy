import { useAtom } from "jotai";
import { datasetsAtom } from "../store";

export const useDatasets = () => useAtom(datasetsAtom);
