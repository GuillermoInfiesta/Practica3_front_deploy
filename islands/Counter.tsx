import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  console.log("Cookies: " + navigator.cookieEnabled);
  const getCookie = async () => {
    await fetch("/api/cookieLog");
  };
  const getDoc = () => {
    console.log(document.cookie);
  };
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => getCookie}>-1</Button>
      <p class="text-3xl tabular-nums">{props.count}</p>
      <Button onClick={() => getDoc}>+1</Button>
    </div>
  );
}
