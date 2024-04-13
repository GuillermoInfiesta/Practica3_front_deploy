import { FunctionComponent } from "preact";
import { OpenLogin, OpenSignUp } from "../methods/PopupInteractions.ts";

export const LogOptions: FunctionComponent = () => {
  return (
    <div class="session-login">
      <button class="login" onClick={() => OpenLogin()}>
        Login
      </button>
      <button class="sign-up" onClick={() => OpenSignUp()}>
        Sign Up
      </button>
    </div>
  );
};
