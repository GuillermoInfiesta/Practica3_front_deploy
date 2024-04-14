import { FunctionComponent } from "preact";
import { ActiveUser } from "../islands/ActiveUser.tsx";
import { LogOptions } from "../islands/LogOptions.tsx";
import { Signal } from "@preact/signals";
import { Lover } from "../Types.ts";

export const Header: FunctionComponent<
  { logged: Signal<boolean>; active_user: Signal<Lover | undefined> }
> = (
  props,
) => {
  return (
    <div class="header">
      <div class="page-logo">
        <img
          class="logo"
          src="https://static.vecteezy.com/system/resources/previews/018/910/833/original/tinder-app-logo-tinder-app-icon-free-free-vector.jpg"
        />
        <h2>Ligoteo World</h2>
      </div>
      {props.logged.value && (
            <ActiveUser
              name={props.active_user.value?.name || "Hola"}
              img={props.active_user.value?.photo || "A"}
            />
          ) ||
        <LogOptions />}
    </div>
  );
};
