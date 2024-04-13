import { FunctionComponent } from "preact";
import { Lover } from "../Types.ts";
import { AddCookie } from "../islands/AddCookie.tsx";
import { Signal } from "@preact/signals";

type LoverCardPorps = {
  name: string;
  age: number;
  photo: string;
};
export const LoverCard: FunctionComponent<
  { lover: Lover; focused_lover: Signal<Lover> }
> = (props) => {
  return (
    <div
      class="lover-card"
      onClick={() => {
        /*Show popup &*/ props.focused_lover.value = props.lover;
      }}
    >
      <img src={props.lover.photo} alt={`${props.lover.name}´s image`} />
      <div class="details">{props.lover.name + " " + props.lover.age}</div>
    </div>
  );
};
