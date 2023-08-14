import { useCasesAtom } from "../store";
import { useAtom } from "jotai";

export const useUseCases = () => useAtom(useCasesAtom);
