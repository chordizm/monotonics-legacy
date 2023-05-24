import { Task } from "@monotonics/core";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.usecases.getTask.execute();
    }),
});
