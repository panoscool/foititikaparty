import React from "react";
import { useSelector } from "react-redux";
import AuthForm from "./AuthForm";

function SigninPage() {
  const { loading } = useSelector(state => state.asyncReducer);

  const handleSubmit = data => {
    console.log(data);
  };
  return (
    <AuthForm
      loading={loading}
      emailLabel="Email"
      passwordLabel="Password"
      buttonLabel="Continue"
      onSubmit={handleSubmit}
    />
  );
}

export default SigninPage;
