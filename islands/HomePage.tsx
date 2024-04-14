import { FunctionComponent } from "preact";
import { LoversFlex } from "../components/LoversFlex.tsx";
import { SearchFilters } from "./SearchFilters.tsx";
import { Signal, useSignal } from "@preact/signals";
import { Lover } from "../Types.ts";
import { LoginPopup } from "./LoginPopup.tsx";
import { SignUpPopup } from "./SignupPopup.tsx";
import { LoverProfile } from "../components/LoverProfile.tsx";
import { useEffect } from "preact/hooks";
import { ActiveUserProfile } from "./ActiveUserProfile.tsx";
import jscookie from "npm:js-cookie@3.0.5";
import { active_user } from "../Signals.ts";

type HomePageProps = {
  logged: Signal<boolean>;
  active_user: Signal<Lover | undefined>;
  lovers: Lover[];
  all_hobbies: string[];
};
export const HomePage: FunctionComponent<HomePageProps> = (props) => {
  const name = useSignal<string>("");
  const age = useSignal<number[]>([0, 100]);
  const sex = useSignal<string>("any");
  const hobbies = useSignal<string[]>([]);

  const focused_lover = useSignal<Lover>({
    name: "",
    age: 0,
    sex: "",
    hobbies: [],
    comments: [],
    photo: "",
    description: "",
  });

  const credentials = useSignal<
    { username: string; password: string } | undefined
  >(undefined);
  useEffect(() => {
    //console.log(active_user.value);
    console.log("Checkeando cookies");
    const username = jscookie.get("username");
    if (username === undefined) return;

    const pw = jscookie.get("password");
    if (pw === undefined) return;

    const foo = async () => {
      const res = await fetch("/api/ValidateLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, password: pw }),
      });
      if (res.status !== 200) {
        return;
      }
      const res2 = await fetch(`/api/FetchUser?name=${username}`);
      const user_data = await res2.json();
      props.active_user.value = user_data;
      console.log(props.active_user.value);
    };

    foo();
    props.logged.value = true;
    credentials.value = { username: username, password: pw };
  }, []); //Solo la vez que carga (aunque de normal esto no nos daba problemas)

  return (
    <div>
      <div id="home" class="home-page">
        <SearchFilters
          name={name}
          age={age}
          sex={sex}
          hobbies={hobbies}
          all_hobbies={props.all_hobbies}
        />
        <LoversFlex
          lovers={props.lovers}
          filters={{ name, age, sex, hobbies }}
          focused_lover={focused_lover}
        />
      </div>
      <LoginPopup logged_in={props.logged} />
      <SignUpPopup />
      <LoverProfile lover={focused_lover} credentials={credentials} />
      <ActiveUserProfile user_data={props.active_user} />
    </div>
  );
};
