import { selectedItemIndexAtom } from "../store";
import { useAtom } from "jotai";

export const useSelectedItemIndex = () => useAtom(selectedItemIndexAtom);
