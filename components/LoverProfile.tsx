import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Lover } from "../Types.ts";
import { CloseAllPopups } from "../methods/PopupInteractions.ts";
import { Comment } from "./Comment.tsx";
import { CommentsBox } from "./CommentsBox.tsx";
import { HobbiesBox } from "../islands/HobbiesBox.tsx";
import { CommentWritter } from "../islands/CommentWritter.tsx";

export const LoverProfile: FunctionComponent<
  {
    lover: Signal<Lover>;
    credentials: Signal<{ username: string; password: string } | undefined>;
  }
> = (
  props,
) => {
  //Abajo una isla para poder añadir comments
  //Props tambien deberia tener el logged_in y el nombre para los comments
  return (
    <div id="popup#lover" class="popup popup-lover">
      <div class="lover-data">
        <div class="flex flex-col">
          <img src={props.lover.value.photo} />
          <div>
            <h2>{props.lover.value.name}</h2>
            <div>
              <span>{props.lover.value.age + " "}</span>
              <span>{props.lover.value.sex}</span>
            </div>
          </div>
        </div>
        <button class="decorated-button" onClick={() => CloseAllPopups()}>
          Close Profile
        </button>
      </div>
      <div class="lover-details">
        <h4>About me</h4>
        <div class="about-lover">
          <div class="half">
            <h5>Description</h5>
            <div class="span">
              {props.lover.value.description}
            </div>
          </div>
          <div class="half">
            <h5>Hobbies</h5>
            <HobbiesBox hobbies={props.lover.value.hobbies} dynamic={false} />
          </div>
        </div>
        <h4>Comments</h4>
        <CommentsBox comments={props.lover.value.comments} />
        {props.credentials.value !== undefined && (
          <CommentWritter
            lover={props.lover.value.name}
            user={props.credentials.value.username}
            password={props.credentials.value.password}
          />
        )}
      </div>
    </div>
  );
};
