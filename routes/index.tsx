import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Header } from "../islands/Header.tsx";
import { HomePage } from "../islands/HomePage.tsx";
import { Lover } from "../Types.ts";
import { useSignal } from "@preact/signals";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown>) => {
    const response = await fetch("https://lovers.deno.dev/");
    const data = await response.json();
    const response2 = await fetch("https://lovers.deno.dev/hobbies");
    const hobbies = await response2.json();
    return ctx.render({ lovers: data, hobbies: hobbies });
  },
};
export default function Home(props: PageProps) {
  const logged_in = useSignal<boolean>(false);
  const active_user = useSignal<Lover | undefined>(undefined);
  return (
    <div class="width-100">
      <Header
        logged={logged_in}
        active_user={active_user}
      />
      <HomePage
        all_hobbies={props.data.hobbies}
        lovers={props.data.lovers}
        logged={logged_in}
        active_user={active_user}
      />
    </div>
  );
}
