import { UseCases } from "@monotonics/core";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

interface CreateContextOptions {
  useCases: UseCases;
}

export async function createContextInner(_opts: CreateContextOptions) {
  return {
    useCases: _opts.useCases,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  const req = opts.req as any;
  return await createContextInner({
    useCases: req.useCases,
  });
}
