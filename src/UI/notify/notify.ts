import style from "./notify.module.scss";

export function notify(
  text: string,
  type: "info" | "success" | "warning" | "error" = "info",
  timer: number = 2000
): void {
  const app = document.getElementsByClassName("app")[0];
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
}
