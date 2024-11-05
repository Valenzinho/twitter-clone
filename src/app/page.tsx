import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthButtonServer } from "./components/auth-button-server";
import PostCard from "./components/post-card";
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
    .select("*, users(name, avatar_url, user_name)")

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <AuthButtonServer />
      
        {
          posts?.map(post => {

            const {
              id, 
              user,
              content
            } = post

            const {
              user_name: userName,
              name: userFullName,
              avatar_url: avatarUrl,
            } = user
            
            return (
              <PostCard
                {...{ content, userName, userFullName, avatarUrl }}
                key={id}
              />
            )
          })
        }
     
    </main>
  );
}