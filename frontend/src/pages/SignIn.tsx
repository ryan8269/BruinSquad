import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <>
      <h1>Sigma</h1>
      <SignIn path="/sign-in" />
    </>
  );
}
