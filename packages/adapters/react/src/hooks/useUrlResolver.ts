import { UrlResolverAtom } from "../store";
import { useAtomValue } from "jotai";

export const useUrlResolver = () => useAtomValue(UrlResolverAtom);
