import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButton } from "@/app/components/auth-button-client";
import { AuthButtonServer } from "./components/auth-button-server";

export default async function Home() {
  // Pasamos cookies directamente como una función
  const supabase = createServerComponentClient({ cookies });

  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <AuthButtonServer />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}