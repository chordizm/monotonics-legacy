import { useAtom } from "jotai";
import { mimeTypeAtom } from "../store";

export const useMimeType = () => useAtom(mimeTypeAtom);
