import { Signal } from "@preact/signals";

export type UserComment = {
  user: string;
  message: string;
};

export type Lover = {
  name: string;
  //password: string;
  age: number;
  sex: string;
  description: string;
  hobbies: string[];
  photo: string;
  comments: UserComment[];
};

export type SearchFiltersProps = {
  name: Signal<string>;
  age: Signal<number[]>;
  sex: Signal<string>;
  hobbies: Signal<string[]>;
};
