import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const datasetRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        taskId: z.string(),
        params: z.record(z.unknown()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.useCases.createDataset.execute(input);
    }),
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ ctx }) => {
      if (!ctx.permissions.some((p) => p === "*" || p === "dataset.get")) {
        throw new Error("Permission denied");
      }
      return ctx.useCases.getDatasets.execute(undefined);
    }),
});
