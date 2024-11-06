import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthButtonServer } from "./components/auth-button-server";
import { PostLists } from "./components/posts-list";
import { user } from "@nextui-org/react";

export default async function Home() {
  // Pasamos cookies directamente como una función
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect("/login")
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*, user:users(name, avatar_url, user_name)")

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        <AuthButtonServer />
        <PostLists posts={posts} />
      </section>
     
    </main>
  );
}