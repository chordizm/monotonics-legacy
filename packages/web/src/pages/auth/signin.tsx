import { SignInForm } from "@monotonics/adapter_react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

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
  const session = await getServerSession(req, res, authOptions);
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
