import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  list: publicProcedure.query(async ({ input, ctx }) => {
    return ctx.usecases.getTasks.execute(undefined);
  }),
});
