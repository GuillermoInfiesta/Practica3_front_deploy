import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  POST: async (req: Request) => {
    const body = await req.json();
    const { name, user, message, password } = body;
    const response = await fetch(`https://lovers.deno.dev/${name}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user,
        password: password,
        message: message,
      }),
    });
    return response;
  },
};
