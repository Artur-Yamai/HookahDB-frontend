import style from "./confirm.module.scss";

export async function confirm(text: string): Promise<boolean> {
  const app = document.getElementById("root");

  if (!app) return false;

  let result: boolean = false;
  let resolve: any;
  const sleep = () => new Promise((r) => (resolve = r));

  const substrate = document.createElement("div");
  substrate.classList.add(style.substrate);

  const confirm = document.createElement("div");
  confirm.classList.add(style.confirm);

  confirm.innerHTML = `
    <p class="${style.textWrapper}">${text}</p>
    <div class="${style.controller}">
    </div>
  `;

  substrate.append(confirm);
  app.append(substrate);

  // кнопка подтверждения
  const yepConfirmBtn = document.createElement("button");
  yepConfirmBtn.innerText = "Да";
  yepConfirmBtn.addEventListener("click", () => toConfirm(true));
  // кнопка отмены
  const notConfirmBtn = document.createElement("button");
  notConfirmBtn.innerText = "Нет";
  notConfirmBtn.addEventListener("click", () => toConfirm(false));

  const controllerPlace = document.getElementsByClassName(style.controller)[0];
  controllerPlace.append(yepConfirmBtn);
  controllerPlace.append(notConfirmBtn);

  function toConfirm(isConfirm: boolean) {
    result = isConfirm;
    yepConfirmBtn.removeEventListener("click", () => toConfirm(true));
    notConfirmBtn.removeEventListener("click", () => toConfirm(true));
    resolve();
  }

  await sleep();

  app.removeChild(substrate);

  return result;
}
