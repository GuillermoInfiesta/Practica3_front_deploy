import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  PUT: async (req: Request) => {
    const body = await req.json();
    const response = await fetch(`https://lovers.deno.dev/${body.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photo: body.photo,
        age: body.age,
        sex: body.sex,
        description: body.description,
        hobbies: body.hobbies,
        comments: body.comments,
      }),
    });
    return response;
  },
};
