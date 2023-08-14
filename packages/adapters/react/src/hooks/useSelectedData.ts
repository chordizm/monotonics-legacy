import { selectedDataAtom } from "../store";
import { useAtom } from "jotai";

export const useSelectedData = () => useAtom(selectedDataAtom);
