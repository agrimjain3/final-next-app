"use client";

import Link from "next/link";
import { useActionState } from "react";
import { auth } from "../actions/auth-actions";
import Image from "next/image";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useActionState(auth.bind(null, mode), {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an Account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?login">Login with exisiting Account</Link>
        )}
      </p>
    </form>
  );
}
