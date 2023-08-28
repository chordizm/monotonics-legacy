import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const datasetRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        taskId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.usecases.createDataset.execute(input);
    }),
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ ctx }) => {
      return ctx.usecases.getDatasets.execute(undefined);
    }),
});
