import { NotifyTypes } from "../../Types";
import style from "./notify.module.scss";

export const notify = (
  text: string,
  type: NotifyTypes = "info",
  timer: number = 2000
): void => {
  const app = document.getElementById("root");
  if (!app) return;
  const notifyWrap = document.createElement("div");
  notifyWrap.classList.add(style.notify);

  const notify = document.createElement("div");
  notify.classList.add(style.text);
  notify.classList.add(style[type]);
  notify.innerText = text;

  notifyWrap.append(notify);

  app.append(notifyWrap);

  setTimeout(() => {
    notifyWrap.classList.add(style.show);
  }, 0);

  setTimeout(() => {
    notifyWrap.classList.remove(style.show);
    setTimeout(() => app.removeChild(notifyWrap), 500);
  }, timer);
};
