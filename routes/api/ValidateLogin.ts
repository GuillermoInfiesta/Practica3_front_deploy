import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  POST: async (req: Request) => {
    const body = await req.json();
    const { name, password } = body;
    const response = await fetch("https://lovers.deno.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, password: password }),
    });
    return response;
  },
};
