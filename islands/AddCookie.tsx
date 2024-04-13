import { FunctionComponent } from "preact";

export const AddCookie: FunctionComponent = () => {
  const addCk = async () => {
    await fetch("/api/cookieLog");
  };
  return <button onClick={addCk}>Add</button>;
};
