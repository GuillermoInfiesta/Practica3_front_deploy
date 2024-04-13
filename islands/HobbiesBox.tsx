import { FunctionComponent } from "preact";
export const HobbiesBox: FunctionComponent<
  { hobbies: string[]; dynamic: boolean }
> = (props) => {
  return (
    <div class="hobbies-box">
      {props.hobbies.length !== 0 &&
          props.hobbies.map((hb) => <div class="hobbie">{hb}</div>) ||
        <p>No hobbies? Maybe he/she isnt so interesting after all...</p>}
    </div>
  );
};
