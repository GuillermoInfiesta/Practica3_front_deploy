import { FunctionComponent } from "preact";
import { SearchFiltersProps } from "../Types.ts";

export const SearchFilters: FunctionComponent<
  SearchFiltersProps & { all_hobbies: string[] }
> = (props) => {
  /*<input
    type="number"
    min={18}
    onInput={(e) => props.age.value = e.currentTarget.value}
  >
    Age
  </input>*/
  return (
    <div class="search-filters">
      <div class="flex flex-col">
        <label>Name</label>
        <input
          id="name-input"
          type="text"
          onInput={(e) => props.name.value = e.currentTarget.value}
        />
      </div>
      <div class="flex flex-col">
        <label>Gender</label>
        <select
          value="any"
          onChange={(e) => {
            props.sex.value = e.currentTarget.value;
          }}
        >
          <option>any</option>
          <option>female</option>
          <option>male</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label>Age</label>
        <div>
          <span>Min</span>
          <input
            value={props.age.value[0]}
            type="number"
            onInput={(e) =>
              props.age.value = [
                parseInt(e.currentTarget.value),
                props.age.value[1],
              ]}
            min={16}
            max={props.age.value[1]}
          />
        </div>
        <div>
          <span>Max</span>
          <input
            value={props.age.value[1]}
            type="number"
            onInput={(e) =>
              props.age.value = [
                props.age.value[0],
                parseInt(e.currentTarget.value),
              ]}
            min={props.age.value[0]}
            max={100}
          />
        </div>
      </div>
      <div>
        <legend>Hobbies</legend>
        <select
          value="any"
          onChange={(e) => props.hobbies.value = [e.currentTarget.value]}
        >
          {props.all_hobbies.map((hb) => <option>{hb}</option>)}
        </select>
      </div>
      <button
        onClick={() => {
          props.name.value = "";
          props.age.value = [0, 100];
          props.sex.value = "any";
          props.hobbies.value = [];
        }}
      >
        Reset filters
      </button>
    </div>
  );
};
