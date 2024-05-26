import React from "react";
import RegisterForm from "../../Components/Forms/Register";

function SignUpPage() {
  return (
    <main className="grow p-8">
      <h1 className="text-center text-2xl">Welcome to Holidaze</h1>
      <RegisterForm />
    </main>
  );
}

export default SignUpPage;
