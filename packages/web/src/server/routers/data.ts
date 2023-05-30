import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const dataRouter = router({
  filterByDataset: publicProcedure
    .input(
      z.object({
        datasetId: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.optional(z.string()),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.usecases.getDataByDatasetId.execute(
        input.datasetId ?? ""
      );
      return data;
    }),
});
