import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  DELETE: async (req: Request) => {
    console.log("holi");
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const body = await req.json();
    const { password } = body;

    const response = await fetch(`https://lovers.deno.dev/${name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password }),
    });

    return response;
  },
};
