import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <main style={{ padding: 16 }}>
        <p>Not authenticated</p>
        <a href="/login">Go to login</a>
      </main>
    );
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}