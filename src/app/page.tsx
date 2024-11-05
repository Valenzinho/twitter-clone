import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthButtonServer } from "./components/auth-button-server";

export default async function Home() {
  // Pasamos cookies directamente como una función
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect("/login")
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(*)")

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <AuthButtonServer />
      <pre>
        {
          JSON.stringify(posts, null, 2)
        }
      </pre>
    </main>
  );
}