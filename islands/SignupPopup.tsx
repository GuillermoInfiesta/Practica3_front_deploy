import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { CloseAllPopups, CloseSignUp } from "../methods/PopupInteractions.ts";
import jscookie from "npm:js-cookie@3.0.5";

export const SignUpPopup: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [error, setError] = useState<string>("");

  const signup = async () => {
    if (name === "" || name.indexOf(" ") !== -1) {
      setError("Non valid name");
      return;
    }
    if (password === "" || password.indexOf(" ") !== -1) {
      setError("Non valid password");
      return;
    }
    if (password !== password2) {
      setError("Passwords dont match");
      return;
    }
    //Meter el resto de inputs y comprobar

    const response_to_create = await fetch("/api/PostNewUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: password,
        photo: photo,
        description: description,
        sex: sex,
        age: age,
        hobbies: hobbies,
        comments: [],
      }),
    });

    if (response_to_create.status === 200) {
      jscookie.set("username", name, { expires: 365 });
      jscookie.set("password", password, { expires: 365 });
      window.location.reload();
    }

    //Mostrar mensaje de error o algo
  };
  return (
    <div id="popup#signup" class="popup flex flex-col">
      <div class="login-header">
        <button type="exit" onClick={() => CloseAllPopups()}>x</button>
        <h3>Sign Up</h3>
      </div>
      <div class="login-form overflow">
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
        <label class="login-form-label">
          <span>Repeat Password</span>
          <input
            type="password"
            value={password2}
            onInput={(e) => {
              setPassword2(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>
        <label class="login-form-label">
          <span>Photo</span>
          <input
            type="text"
            onInput={(e) => {
              setPhoto(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>
        <label class="login-form-label">
          <span>Description</span>
          <textarea
            maxLength={400}
            type="text"
            onInput={(e) => {
              setDescription(e.currentTarget.value);
              setError("");
            }}
          >
          </textarea>
        </label>
        <label class="login-form-label">
          <span>Age</span>
          <input
            type="text"
            onInput={(e) => {
              setAge(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>
        <label class="login-form-label">
          <span>Sex</span>
          <input
            type="text"
            onInput={(e) => {
              setSex(e.currentTarget.value);
              setError("");
            }}
          >
          </input>
        </label>

        <button onClick={signup}>Continue</button>
        {error !== "" && <span class="error">{error}</span>}
      </div>
    </div>
  );
};
