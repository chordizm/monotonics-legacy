import { colorsAtom } from "../store";
import { useAtom } from "jotai";

export const useColors = () => useAtom(colorsAtom);
