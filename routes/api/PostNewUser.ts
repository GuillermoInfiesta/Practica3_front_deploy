import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  POST: async (req: Request) => {
    const body = await req.json();
    const { name, password, photo, description, hobbies, sex, age, comments } =
      body;
    const response_to_create = await fetch("https://lovers.deno.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: password,
        photo: photo,
        description: description,
        sex: sex,
        age: age,
        hobbies: hobbies,
        comments: [],
      }),
    });
    return response_to_create;
  },
};
