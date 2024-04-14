import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Lover, UserComment } from "../Types.ts";
import { CloseAllPopups } from "../methods/PopupInteractions.ts";
import { useEffect, useState } from "preact/hooks";
import jscookie from "npm:js-cookie@3.0.5";
import { CommentsBox } from "../components/CommentsBox.tsx";
import { HobbiesBox } from "./HobbiesBox.tsx";

export const ActiveUserProfile: FunctionComponent<
  { user_data: Signal<Lover | undefined> }
> = (props) => {
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [auxhobbie, setAuxhobbie] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [commentsUserDelete, setComementsUserDelete] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setName(props.user_data.value?.name || "");
    setPhoto(props.user_data.value?.photo || "");
    setAge(props.user_data.value?.age || 0);
    setDescription(props.user_data.value?.description || "");
    setHobbies(props.user_data.value?.hobbies || []);
    setSex(props.user_data.value?.sex || "");
    setComments(props.user_data.value?.comments || []);
    console.log(props.user_data.value);
  }, [props.user_data.value]);

  const updateData = async () => {
    const response = await fetch("/api/UpdateUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        photo: photo,
        sex: sex,
        age: age,
        description: description,
        hobbies: hobbies,
        comments: comments,
      }),
    });
    if (response.status !== 200) {
      return;
      //Mostrar error
    }

    jscookie.set("username", name, { expires: 365 });

    window.location.reload();
  };

  //Funciona juraria
  const deleteUser = async () => {
    if (password === "" || password.indexOf(" ") === 0) {
      return;
    }

    const response = await fetch(
      `/api/DeleteUser?name=${props.user_data.value?.name}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password }),
      },
    );

    if (response.status !== 200) {
      //Checkear statuses 401 y 404 para el error
      return;
    }

    jscookie.remove("username");
    jscookie.remove("password");
    window.location.reload();
  };

  const logOut = () => {
    jscookie.remove("username");
    jscookie.remove("password");
    window.location.reload();
  };

  return (
    <div id="popup#user-profile" class="popup popup-user-profile">
      <div class="login-header">
        <button
          type="exit"
          onClick={() => {
            CloseAllPopups();
          }}
        >
          x
        </button>
        <h3>Edit Your Profile</h3>
      </div>
      <div class="overflow">
        <div id="profile#name">
          <h5>Name</h5>
          <input
            value={name}
            placeholder={"Current name: " + props.user_data.value?.name}
            onInput={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </div>
        <div id="profile#image">
          <h5>Image</h5>
          <div class="image-input">
            <input
              value={photo}
              placeholder="URL"
              onInput={(e) => setPhoto(e.currentTarget.value)}
            />
            <span>Preview</span>
            <img src={photo} />
          </div>
        </div>
        <div id="profile#sex&name" class="flex gap-8 width-max">
          <div class="width-30">
            <h5>Sex</h5>
            <select value={sex} onChange={(e) => setSex(e.currentTarget.value)}>
              <option>female</option>
              <option>male</option>
            </select>
          </div>
          <div class="width-30">
            <h5>Age</h5>
            <input
              value={age}
              type="number"
              min={16}
              max={100}
              onInput={(e) => setAge(parseInt(e.currentTarget.value))}
            />
          </div>
        </div>
        <div id="profile#description" class="profile-description">
          <h5>Description</h5>
          <textarea
            value={description}
            maxLength={400}
            placeholder={"Current description: " +
              props.user_data.value?.description}
            onInput={(e) => setDescription(e.currentTarget.value)}
          />
          <p>Maximum description length is 400 characters</p>
        </div>
        <div id="profile#hobbies">
          <h5>Hobbies</h5>
          <input
            value={auxhobbie}
            onInput={(e) => {
              setAuxhobbie(e.currentTarget.value);
            }}
          />
          <button
            class="decorated-button"
            onClick={() => {
              console.log(`hobbie: ${auxhobbie}`);
              if (
                auxhobbie.length === 0 || auxhobbie.indexOf(" ") === 0
              ) return;
              if (hobbies.indexOf(auxhobbie) !== -1) return;
              //Añadir a una señal de un array -> a=[1,2] para añadir un 3, a = [...a, 3], de esta forma el value cambia su referencia y se repinta
              hobbies.push(auxhobbie.toLowerCase());
              setAuxhobbie("");
              console.log("añadido");
            }}
          >
            Add hobbie
          </button>
          <button
            class="decorated-button"
            onClick={() => {
              const i = hobbies.indexOf(auxhobbie);
              if (i === -1) return;
              hobbies.splice(i, 1);
              setAuxhobbie("");
            }}
          >
            Delete hobbie
          </button>
          <HobbiesBox hobbies={hobbies} dynamic={true} />
        </div>
        <div id="profile#comments" class="profile-comments">
          <h5>Comments</h5>
          <CommentsBox comments={comments} />
          <span>Delete comments from user:</span>
          <input
            onInput={(e) => setComementsUserDelete(e.currentTarget.value)}
          />
          <button
            class="decorated-button"
            onClick={() => {
              const filteredComments = comments.filter((cm) =>
                cm.user !== commentsUserDelete
              );
              setComments(filteredComments);
            }}
          >
            Delete comments
          </button>
        </div>
        <div>
          <h5>Log out</h5>
          <button
            onClick={() => {
              logOut();
            }}
          >
            Log out
          </button>
        </div>
        <div id="profile#delete" class="profile-delete">
          <h5>Delete profile</h5>
          <p>
            Warning, this action can not be reverted. If you choose to delete
            the profile it will be errased from out database, with no option of
            recovering it.
          </p>
          <input
            type="password"
            placeholder="Enter password"
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          <button class="decorated-button" onClick={deleteUser}>
            DELETE PROFILE
          </button>
        </div>
      </div>
      <button class="decorated-button" onClick={updateData}>
        Apply Changes
      </button>
    </div>
  );
};
