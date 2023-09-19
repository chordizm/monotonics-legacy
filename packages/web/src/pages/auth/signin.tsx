import { SignInForm } from "@monotonics/adapter_react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import CredentialProvider from "next-auth/providers/credentials";
import { UseCases } from "@monotonics/core";

export default function SignIn() {
  const router = useRouter();
  return (
    <SignInForm
      onSubmit={async ({ email, password }) => {
        try {
          await signIn("credentials", {
            redirect: false,
            email,
            password,
          }).then((res) => {
            console.log(res);
            if (res?.error) {
              console.log(res.error);
            } else {
              router.push("/");
            }
          });
        } catch (err) {
          console.log(err);
        }
      }}
    />
  );
}

export async function getServerSideProps({ req, res }: any) {
  const session = await getServerSession(req, res, {
    pages: {},
    providers: [
      CredentialProvider({
        name: "default",
        credentials: {
          email: { label: "E-mail", type: "text", placeholder: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          return null;
        },
      }),
    ],
  });
  console.log("[auth/signIn] session", session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
