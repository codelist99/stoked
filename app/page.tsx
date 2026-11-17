import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stages } from "@/lib/stages";

export default async function Home() {
  const session = process.env.DATABASE_URL ? await auth.api.getSession({ headers: await headers() }) : null;
  return <main className="hero">
    <section><p className="eyebrow">A private awareness check-in</p><h1>Notice the drift.<br />Choose connection.</h1><p className="heroCopy">Check what has been true for you over the last seven days. See where you are on the STOKED path, save each check-in, and learn from your patterns over time.</p><div className="actions"><Link className="button primary" href={session ? "/check-in" : "/auth?mode=signup"}>{session ? "Begin check-in" : "Create free account"} →</Link>{session ? <Link className="button soft" href="/dashboard">View dashboard</Link> : <Link className="button soft" href="/auth">Sign in</Link>}</div><p className="tiny">Your responses are visible only inside your account.</p></section>
    <section className="pathCard" aria-label="The STOKED stages">{stages.map(stage => <div className="pathRow" key={stage.letter}><span className="pathLetter" style={{background: stage.color}}>{stage.letter}</span><span><strong>{stage.name}</strong><small>{stage.short}</small></span></div>)}</section>
  </main>;
}
