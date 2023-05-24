/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseCases } from "@monotonics/core";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  //   repositories: Repositories;
  usecases: UseCases;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {
    usecases: _opts.usecases,
    // repositories: _opts.repositories,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const req = opts.req as any;
  return await createContextInner({
    usecases: req.usecases,
    // repositories: req.repositories,
  });
}
