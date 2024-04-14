import { FunctionComponent } from "preact";
import { Lover } from "../Types.ts";
import { Signal } from "@preact/signals";
import { OpenLover } from "../methods/PopupInteractions.ts";

export const LoverCard: FunctionComponent<
  { lover: Lover; focused_lover: Signal<Lover> }
> = (props) => {
  return (
    <div
      class="lover-card"
      onClick={() => {
        OpenLover();
        props.focused_lover.value = props.lover;
      }}
    >
      <img src={props.lover.photo} alt={`${props.lover.name}´s image`} />
      <div class="details">
        <span>{props.lover.name}</span>
        <span class="age">{" " + props.lover.age}</span>
      </div>
    </div>
  );
};
