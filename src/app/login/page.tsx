"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    if (mode === "signup") {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      });
      if (error) alert(error.message);
      return;
    }

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: true,
    });
    if (error) alert(error.message);
  }

  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Login</h1>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <button onClick={() => setMode("signin")} disabled={mode === "signin"}>
          Sign in
        </button>
        <button onClick={() => setMode("signup")} disabled={mode === "signup"}>
          Sign up
        </button>
      </div>

      {mode === "signup" && (
        <div style={{ marginBottom: 8 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={submit}>{mode === "signup" ? "Create" : "Login"}</button>
    </main>
  );
}