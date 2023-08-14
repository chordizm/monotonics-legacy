import { dataAtom } from "../store";
import { useAtom } from "jotai";

export const useData = () => useAtom(dataAtom);
