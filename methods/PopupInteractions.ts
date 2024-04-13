export const OpenLogin = () => {
  CloseAllPopups();
  //document.getElementById("popup#signup")?.classList.remove("open-popup");
  const popup = document.getElementById("popup#login");
  popup?.classList.add("open-popup");
  popup?.focus();
  const homepage = document.getElementById("home");
  homepage?.classList.add("blur");
};
export const CloseLogin = () => {
  const popup = document.getElementById("popup#login");
  popup?.classList.remove("open-popup");
  const homepage = document.getElementById("home");
  homepage?.classList.remove("blur");
  homepage?.focus();
};

export const OpenSignUp = () => {
  CloseAllPopups();
  //document.getElementById("popup#login")?.classList.remove("open-popup");
  const popup = document.getElementById("popup#signup");
  popup?.classList.add("open-popup");
  popup?.focus();
  const homepage = document.getElementById("home");
  homepage?.classList.add("blur");
};
export const CloseSignUp = () => {
  const popup = document.getElementById("popup#signup");
  popup?.classList.remove("open-popup");
  const homepage = document.getElementById("home");
  homepage?.classList.remove("blur");
  homepage?.focus();
};

export const OpenLover = () => {
  const lover = document.getElementById("popup#lover");
  lover?.classList.add("open-popup");
  lover?.focus();
  const homepage = document.getElementById("home");
  homepage?.classList.add("blur");
};

export const OpenPopup = (id: string) => {
  CloseAllPopups();
  const popup = document.getElementById(id);
  popup?.classList.add("open-popup");
  popup?.focus();
  const homepage = document.getElementById("home");
  homepage?.classList.add("blur");
};

export const CloseAllPopups = () => {
  const popups = document.getElementsByClassName("open-popup");
  for (const i of popups) {
    i.classList.remove("open-popup");
  }
  const homepage = document.getElementById("home");
  homepage?.classList.remove("blur");
};
