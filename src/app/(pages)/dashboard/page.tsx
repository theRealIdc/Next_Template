import { signOut } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Protected route</p>
      <p>{JSON.stringify(user)}</p>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </main>
  );
}
