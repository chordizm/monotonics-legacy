import { router } from "../trpc";
import { dataRouter } from "./data";
import { datasetRouter } from "./dataset";
import { taskRouter } from "./task";

export const appRouter = router({
  data: dataRouter,
  dataset: datasetRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
