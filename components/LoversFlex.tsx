import { LoverCard } from "../islands/LoverCard.tsx";
import { FunctionComponent } from "preact";
import { SearchFiltersProps } from "../Types.ts";
import { Lover } from "../Types.ts";
import { Signal } from "@preact/signals";

type LoversDisplayProps = {
  lovers: Lover[];
  filters: SearchFiltersProps;
  focused_lover: Signal<Lover>;
};
export const LoversFlex: FunctionComponent<LoversDisplayProps> = (props) => {
  const filteredLovers = props.lovers.filter((lov) => {
    if (
      props.filters.name.value !== "" &&
      lov.name.toLowerCase().indexOf(props.filters.name.value.toLowerCase()) ===
        -1
    ) return false;

    if (
      props.filters.sex.value !== "any" &&
      lov.sex.toLowerCase() !== props.filters.sex.value
    ) return false;

    if (
      lov.age < props.filters.age.value[0] ||
      lov.age > props.filters.age.value[1]
    ) return false;

    if (
      props.filters.hobbies.value.length !== 0 &&
      lov.hobbies.filter((hobbie) =>
          props.filters.hobbies.value.includes(hobbie)
        ).length === 0
    ) return false;

    return true;
  });

  return (
    <div class="lovers-flex">
      {filteredLovers.length !== 0 &&
          filteredLovers.map((lov) => (
            <LoverCard
              lover={lov}
              focused_lover={props.focused_lover}
            />
          )) || <h4>If you weren´t so picky you wouldn´t be here...</h4>}
    </div>
  );
};
