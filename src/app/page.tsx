import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase.from('posts').select('*')

  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hola Twitter
        <pre>
          {
            JSON.stringify(posts, null, 2)
          }
        </pre>
      </main> 
  );
}
