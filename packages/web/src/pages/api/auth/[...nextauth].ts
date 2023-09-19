import { UseCases } from "@monotonics/core";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    pages: {
      signIn: "/auth/signin",
    },
    providers: [
      CredentialProvider({
        name: "default",
        credentials: {
          email: { label: "E-mail", type: "text", placeholder: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const useCases = (req as any).useCases as UseCases;
          if (!useCases || !credentials) {
            console.log("useCases", useCases);
            return null;
          }
          const user = await useCases.signIn
            .execute({
              email: credentials.email,
              password: credentials.password,
            })
            .catch((e) => {
              console.log(e);
              return null;
            });
          return user;
        },
      }),
    ],
  });
};
