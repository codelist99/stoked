"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function AuthForm() {
  const search = useSearchParams();
  const [signup, setSignup] = useState(search.get("mode") === "signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")); const password = String(data.get("password"));
    const response = signup
      ? await authClient.signUp.email({ name: String(data.get("name")), email, password })
      : await authClient.signIn.email({ email, password });
    if (response.error) { setError(response.error.message || "Unable to continue."); setLoading(false); return; }
    window.location.href = signup ? "/check-in" : "/dashboard";
  }

  return <main className="authWrap"><section className="authCard"><p className="eyebrow">{signup ? "Start your journey" : "Welcome back"}</p><h1 className="authTitle">{signup ? "Create your account" : "Sign in"}</h1><p className="muted">{signup ? "Save your check-ins and discover patterns over time." : "Continue your private STOKED check-ins."}</p><form onSubmit={submit}>{signup && <label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label>}<label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Password<input name="password" type="password" minLength={8} required autoComplete={signup ? "new-password" : "current-password"} placeholder="At least 8 characters" /></label>{error && <p className="error" role="alert">{error}</p>}<button className="button primary full" disabled={loading}>{loading ? "Please wait…" : signup ? "Create account" : "Sign in"}</button></form><button className="textButton" onClick={() => { setSignup(!signup); setError(""); }}>{signup ? "Already have an account? Sign in" : "New here? Create an account"}</button></section></main>;
}

export default function AuthPage() {
  return <Suspense fallback={<main className="authWrap"><section className="authCard">Loading…</section></main>}><AuthForm /></Suspense>;
}
