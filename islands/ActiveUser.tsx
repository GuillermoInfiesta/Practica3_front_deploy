import { FunctionComponent } from "preact";
import { OpenPopup } from "../methods/PopupInteractions.ts";
export const ActiveUser: FunctionComponent<{ name: string; img: string }> = (
  props,
) => {
  return (
    <button
      class="active-user"
      onClick={() => OpenPopup("popup#user-profile")}
    >
      <img src={props.img} alt={`${props.name}'s profile image`} />
      <h3>{props.name}</h3>
    </button>
  );
};
