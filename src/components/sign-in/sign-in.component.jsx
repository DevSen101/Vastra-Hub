import React, { useState } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";

const SignIn = () => {
  const [email, setEmail] = useState(""); // useState for email
  const [password, setPassword] = useState(""); // useState for password

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div className="sign-in">
      <h1>I already have an account</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <label></label>
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <label></label>
        <input type="submit" value="Submit Form" />
      </form>
    </div>
  );
};

export default SignIn;
