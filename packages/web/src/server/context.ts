import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UseCases } from "@monotonics/core";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";

interface CreateContextOptions {
  useCases: UseCases;
  permissions: string[];
}

export async function createContextInner(_opts: CreateContextOptions) {
  return {
    useCases: _opts.useCases,
    permissions: _opts.permissions,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  const { req, res } = opts as any;
  console.log("[trpc] createContext");
  const { useCases } = req as { useCases: UseCases };

  const session = await getServerSession(req, res, authOptions);
  const user = await useCases.getUserByEmail.execute(
    session?.user?.email ?? ""
  );
  const permissions = await useCases.getPermissions.execute({ id: user.id });
  console.log("[trpc] session", user, permissions);
  return await createContextInner({
    useCases,
    permissions,
  });
}
