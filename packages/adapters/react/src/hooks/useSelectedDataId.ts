import { deriveSelectedDataIdAtom } from "../store";
import { useAtom } from "jotai";

export const useSelectedDataId = () => useAtom(deriveSelectedDataIdAtom);
