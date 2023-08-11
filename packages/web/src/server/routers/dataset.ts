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
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.usecases.getDatasets.execute(undefined);
    }),
  addData: publicProcedure
    .input(
      z.object({
        datasetId: z.string(),
        data: z.string(),
        name: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.usecases.addData.execute({
        date: new Date(),
        datasetId: input.datasetId,
        raw: Buffer.from(input.data.split(",")[1], "base64"),
        mimeType: input.data.split(",")[0].split(";")[0].split(":")[1],
        name: input.name ?? "",
        items: [],
        params: {
          segments: [
            {
              points: [
                { x: 100, y: 100 },
                { x: 100, y: 200 },
                { x: 200, y: 100 },
              ],
            },
          ],
        },
      });
    }),
});
