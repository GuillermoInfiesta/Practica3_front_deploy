import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { CloseAllPopups } from "../methods/PopupInteractions.ts";
import jscookie from "npm:js-cookie@3.0.5";
import { HobbiesBox } from "./HobbiesBox.tsx";

export const SignUpPopup: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [sex, setSex] = useState<string>("male");
  const [age, setAge] = useState<number>(18);
  const [description, setDescription] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbieAux, setHobbieAux] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [error, setError] = useState<string>("");

  const signup = async () => {
    if (name === "" || name.indexOf(" ") !== -1) {
      setError("Non valid name");
      scrollToEnd();
      return;
    }
    if (password === "" || password.indexOf(" ") !== -1) {
      setError("Non valid password");
      scrollToEnd();
      return;
    }
    if (password !== password2) {
      setError("Passwords dont match");
      scrollToEnd();
      return;
    }

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
    if (response_to_create.status === 400) {
      const content = await response_to_create.json();
      setError(content.error);
      return;
    }
    if (response_to_create.status === 200) {
      jscookie.set("username", name, { expires: 365 });
      jscookie.set("password", password, { expires: 365 });
      window.location.reload();
    }
  };

  //En verdad hace scroll al top, pero me da palo cambiarlo
  const scrollToEnd = () => {
    const item = document.getElementById("signup#form");
    item?.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <div id="popup#signup" class="popup flex flex-col">
      <div class="login-header">
        <button type="exit" onClick={() => CloseAllPopups()}>x</button>
        <h3>Sign Up</h3>
      </div>
      <div id="signup#form" class="login-form overflow">
        {error !== "" && <span class="error">{error}</span>}
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
            value={age}
            type="number"
            onInput={(e) => {
              setAge(parseInt(e.currentTarget.value));
              setError("");
            }}
          >
          </input>
        </label>
        <label class="login-form-label">
          <span>Sex</span>
          <select
            value={sex}
            type="text"
            onChange={(e) => {
              setSex(e.currentTarget.value);
              setError("");
            }}
          >
            <option>male</option>
            <option>female</option>
          </select>
        </label>
        <div class="signup-hobbies">
          <label class="login-form-label">
            <span>Hobbie</span>
            <input
              value={hobbieAux}
              type="text"
              onInput={(e) => {
                setHobbieAux(e.currentTarget.value);
                setError("");
              }}
            >
            </input>
          </label>
          <button
            class="width-30"
            onClick={() => {
              console.log(hobbieAux);
              if (
                hobbieAux.length === 0 || hobbieAux.indexOf(" ") === 0
              ) return;
              setHobbieAux(hobbieAux.toLowerCase());
              if (hobbies.indexOf(hobbieAux) !== -1) return;
              hobbies.push(hobbieAux);
              setHobbieAux("");
            }}
          >
            Add hobbie
          </button>
          <HobbiesBox hobbies={hobbies} dynamic={true} />
        </div>
      </div>
      <button
        class="decorated-button"
        onClick={() => {
          signup();
          scrollToEnd;
        }}
      >
        Continue
      </button>
    </div>
  );
};
