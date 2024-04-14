import { FunctionComponent } from "preact";
import { Comment } from "./Comment.tsx";
import { UserComment } from "../Types.ts";

export const CommentsBox: FunctionComponent<{ comments: UserComment[] }> = (
  props,
) => {
  if (!Array.isArray(props.comments)) {
    props.comments = [];
  }
  return (
    <div class="comments">
      {props.comments.map((comm) => (
        <Comment user={comm.user} comment={comm.message} />
      ))}
      {props.comments.length === 0 && (
        <p>Seems like there are no comments yet</p>
      )}
    </div>
  );
};
