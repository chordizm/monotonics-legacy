import { selectedDataUrlAtom } from "../store";
import { useAtom } from "jotai";

export const useSelectedDataUrl = () => useAtom(selectedDataUrlAtom);
