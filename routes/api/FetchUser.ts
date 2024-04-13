import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  GET: async (req: Request) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const res2 = await fetch(`https://lovers.deno.dev/${name}`);
    return res2;
  },
};
