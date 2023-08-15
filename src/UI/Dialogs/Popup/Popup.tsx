import { useRef } from "react";
import { GrClose } from "react-icons/gr";
import { Button } from "../../Button/Button";
import "./Popup.scss";

interface PopupProps {
  visible: boolean;
  close: () => void;
  agree: () => void;
  title?: string;
  children: JSX.Element;
  width?: string;
  height?: string;
}

export const Popup = ({
  visible = false,
  close,
  agree,
  title,
  children,
  width = "600px",
  height = "400px",
}: PopupProps): JSX.Element => {
  const popup = useRef<HTMLDivElement>(null);

  const toHidden = (e: React.MouseEvent<HTMLElement>): void => {
    if (!popup.current) return;

    if (!popup.current.contains(e.target as HTMLElement)) {
      close();
    }
  };

  const setMoveClass = () => {
    window.onmousemove = (e: MouseEvent) => {
      const block = popup.current;
      if (!block) return;
      if (
        window.innerWidth > e.clientX + block.clientWidth / 2 &&
        0 < e.clientX - block.clientWidth / 2
      ) {
        block.style.left = e.clientX - block.clientWidth / 2 + "px";
      }
      if (
        window.innerHeight > e.clientY + block.clientHeight - 15 &&
        e.clientY > 15
      ) {
        block.style.top = e.clientY - 15 + "px";
      }
    };
  };

  const deleteMoveClass = () => (window.onmousemove = null);

  if (!visible) return <></>;

  return (
    <div
      className="dialog-substrate"
      style={{ alignItems: "center" }}
      onMouseDown={toHidden}
    >
      <div ref={popup} className="popup" style={{ width, height }}>
        <header className="popup__header">
          <h3 onMouseDown={setMoveClass} onMouseUp={deleteMoveClass}>
            {title}
          </h3>
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
};
