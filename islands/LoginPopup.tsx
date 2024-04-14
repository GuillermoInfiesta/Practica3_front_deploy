import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { CloseAllPopups } from "../methods/PopupInteractions.ts";
import jscookie from "npm:js-cookie@3.0.5";
import { Signal } from "@preact/signals";

export const LoginPopup: FunctionComponent<{ logged_in: Signal<boolean> }> = (
  props,
) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = async () => {
    if (name === "" || name.indexOf(" ") !== -1) {
      setError("Non valid name");
      return;
    }
    if (password === "" || password.indexOf(" ") !== -1) {
      setError("Non valid password");
      return;
    }

    const login_success = await fetch("../api/ValidateLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, password: password }),
    });

    if (login_success.status !== 200) {
      setError("No matching accounts");
      return;
    }

    jscookie.set("username", name, { expires: 365 });
    jscookie.set("password", password, { expires: 365 });

    window.location.reload();
  };
  return (
    <div id="popup#login" class="popup flex flex-col">
      <div class="login-header">
        <button
          type="exit"
          onClick={() => {
            setName("");
            setPassword("");
            setError("");
            CloseAllPopups();
          }}
        >
          x
        </button>
        <h3>Login</h3>
      </div>
      <div class="login-form">
        <label class="login-form-label">
          <span>Name</span>
          <input
            type="text"
            onInput={(e) => {
              setName(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>
        <label class="login-form-label">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onInput={(e) => {
              setPassword(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>
        <button onClick={login}>Continue</button>
        {error !== "" && <span class="error">{error}</span>}
      </div>
    </div>
  );
};
