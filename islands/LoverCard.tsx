import { FunctionComponent } from "preact";
import { Lover } from "../Types.ts";
import { AddCookie } from "../islands/AddCookie.tsx";
import { Signal } from "@preact/signals";
import { OpenLover } from "../methods/PopupInteractions.ts";
import { useState } from "preact/hooks";

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
  //{props.lover.name + " " + props.lover.age}
};
