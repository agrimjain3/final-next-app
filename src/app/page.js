// import AuthForm from "../../components/auth-form";

// export default async function Home({searchParams}) {
//   const {mode} = await searchParams;
//   const formMode = mode || 'login';
//   return <AuthForm mode={formMode}/>;
// }

"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <br />
        <button onClick={() => signOut}>SIGN OUT</button>
      </>
    );
  }

  return (
    <>
      Not Signed in <br />
      <button onClick={() => signIn}>SIGN IN</button>
    </>
  );
}
