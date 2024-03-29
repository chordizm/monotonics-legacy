import { Index } from "@monotonics/core";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const dataRouter = router({
  list: publicProcedure
    .input(
      z.object({
        datasetId: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.permissions.some((p) => p === "*" || p === "data.get")) {
        throw new Error("Permission denied");
      }
      const data = await ctx.useCases.getDataByDatasetId.execute(
        input.datasetId ?? ""
      );
      console.log("[TRPC] Data fetched.", `${data.length} items.`);
      return data.map<Index & { path: string }>((d) => ({
        id: d.id,
        path: `/api/blob/${d.id}`,
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
      const data = await ctx.useCases.getDataById.execute({ id: input.id });
      console.log("[TRPC] Data fetched.", data.id);
      return data;
    }),
});
