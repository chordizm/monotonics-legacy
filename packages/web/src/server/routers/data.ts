import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const dataRouter = router({
  filterByDatasetId: publicProcedure
    .input(
      z.object({
        datasetId: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.usecases.getDataByDatasetId.execute(
        input.datasetId ?? ""
      );
      console.debug("Data fetched.", data);
      return data.map((d) => ({
        id: d.id,
        date: d.date,
        datasetId: d.datasetId,
        name: d.name,
        mimeType: d.mimeType,
        params: d.params,
        items: d.items,
      }));
    }),
  getDataUrlById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.usecases.getDataUrlById.execute({ id: input.id });
      console.log(`DataUrl fetched. (size: ${data.length})`);
      return data;
    }),
  add: publicProcedure
    .input(
      z.object({
        datasetId: z.string(),
        name: z.string(),
        data: z.string(),
        params: z.any(),
        items: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { datasetId, name, data, items, params } = input;
      const [mimeType, b64] = data.split(",");
      const raw = Buffer.from(b64, "base64");
      const id = await ctx.usecases.addData.execute({
        datasetId,
        date: new Date(),
        raw,
        name,
        mimeType,
        items,
        params,
      });
      const taskId = (await ctx.usecases.getDataset.execute({ id: datasetId }))
        .taskId;
      ctx.usecases.runTask.execute({ id: taskId, dataId: id });
      return id;
    }),
});
