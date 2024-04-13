import { FunctionComponent } from "preact";
export const Comment: FunctionComponent<{ user: string; comment: string }> = (
  props,
) => {
  return (
    <div class="user-comment">
      <h4>@{props.user}</h4>
      <p>{props.comment}</p>
    </div>
  );
};
