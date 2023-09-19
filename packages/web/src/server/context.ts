import { UseCases } from "@monotonics/core";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

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
  const { useCases } = req as { useCases: UseCases };

  const session = await getServerSession(req, res, {
    pages: {},
    providers: [
      CredentialProvider({
        name: "default",
        credentials: {
          email: { label: "E-mail", type: "text", placeholder: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize() {
          return null;
        },
      }),
    ],
  });
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
