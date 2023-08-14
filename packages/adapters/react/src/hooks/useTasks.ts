import { tasksAtom } from "../store";
import { useAtom } from "jotai";

export const useTasks = () => useAtom(tasksAtom);
