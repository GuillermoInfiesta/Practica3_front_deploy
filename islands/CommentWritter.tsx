import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

export const CommentWritter: FunctionComponent<
  { user: string; lover: string; password: string }
> = (props) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const sendComment = async () => {
    if (comment.length === 0 || !comment.trim()) {
      setError("Cannot publish an empty comment");
      return;
    }
    const response = await fetch("/api/PublishComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: props.lover,
        user: props.user,
        password: props.password,
        message: comment.trim(),
      }),
    });
    if (response.status !== 200) {
      setError("The comment wasnt added");
      return;
    }

    window.location.reload();
  };
  return (
    <div class="comment-writter">
      <h5>Add a comment</h5>
      <div>
        <input
          onInput={(e) => {
            setComment(e.currentTarget.value);
            setError("");
          }}
        />
        <button class="decorated-button2" onClick={sendComment}>Publish</button>
      </div>
      {error !== "" && <span class="error">{error}</span>}
    </div>
  );
};
