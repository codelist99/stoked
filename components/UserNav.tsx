"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function UserNav({ name }: { name: string }) {
  return <div className="userNav"><span>Hi, {name.split(" ")[0]}</span><Link href="/check-in">New check-in</Link><button onClick={async () => { await authClient.signOut(); window.location.href = "/"; }}>Sign out</button></div>;
}
