import { useRef } from "react";
import { GrClose } from "react-icons/gr";
import { Button } from "../../Button/Button";
import "./Popup.scss";

interface IPopup {
  visible: boolean;
  close: () => void;
  agree: () => void;
  title?: string;
  children: JSX.Element;
  width?: string;
  height?: string;
}

export function Popup({
  visible = false,
  close,
  agree,
  title,
  children,
  width = "600px",
  height = "400px",
}: IPopup): JSX.Element {
  const popup = useRef<HTMLDivElement>(null);
  const style = { width, height };

  const toHidden = (e: React.MouseEvent<HTMLElement>): void => {
    if (!popup.current) return;

    if (!popup.current.contains(e.target as HTMLElement)) {
      close();
    }
  };

  if (!visible) return <></>;

  return (
    <div
      className="dialog-substrate"
      style={{ alignItems: "center" }}
      onMouseDown={toHidden}
    >
      <div ref={popup} className="popup" style={style}>
        <header className="popup__header">
          <h3>{title}</h3>
          <button onClick={close}>
            <GrClose />
          </button>
        </header>
        <main className="popup__content">{children}</main>
        <footer className="popup__button-place">
          <Button className="popup__button" text="ОК" click={agree} />
          <Button className="popup__button" text="Отмена" click={close} />
        </footer>
      </div>
    </div>
  );
}
