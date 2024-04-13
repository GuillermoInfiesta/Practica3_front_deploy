import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Lover } from "../Types.ts";
export const CommentWritter: FunctionComponent<
  { user: string; lover: string; password: string }
> = (props) => {
  const [comment, setComment] = useState<string>("");
  const sendComment = async () => {
    console.log({
      name: props.lover,
      user: props.user,
      password: props.password,
      message: comment,
    });
    const response = await fetch("/api/PublishComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: props.lover,
        user: props.user,
        password: props.password,
        message: comment,
      }),
    });
    if (response.status !== 200) {
      return;
    }
  };
  return (
    <div>
      <input
        onInput={(e) => {
          setComment(e.currentTarget.value);
        }}
      />
      <button onClick={sendComment}>Publish</button>
    </div>
  );
};
