import { Index } from "@monotonics/core";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const dataRouter = router({
  filterByDatasetId: publicProcedure
    .input(
      z.object({
        datasetId: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.usecases.getDataByDatasetId.execute(
        input.datasetId ?? ""
      );
      console.debug("Data fetched.", data);
      return data.map<Index>((d) => ({
        id: d.id,
        date: d.date,
        datasetId: d.datasetId,
        name: d.name,
        mimeType: d.mimeType,
      }));
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.usecases.getDataById.execute({ id: input.id });
      console.log(`Data fetched. (size: ${data.raw.length})`);
      return data;
    }),
  add: publicProcedure
    .input(
      z.object({
        datasetId: z.string(),
        name: z.string(),
        type: z.string(),
        data: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { datasetId, type: mimeType, name, data: raw } = input;
      const id = await ctx.usecases.addData.execute({
        datasetId,
        date: new Date(),
        raw,
        name,
        mimeType,
        items: [],
        params: {},
      });
      const taskId = (await ctx.usecases.getDataset.execute({ id: datasetId }))
        .taskId;
      ctx.usecases.runTask.execute({ id: taskId, dataId: id });
      return id;
    }),
});
