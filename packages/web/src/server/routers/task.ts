import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const taskRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ ctx }) => {
      return ctx.usecases.getTasks.execute(undefined);
    }),
});
