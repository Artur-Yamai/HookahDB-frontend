import { useEffect, useRef, useState } from "react";
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

export const Popup = ({
  visible = false,
  close,
  agree,
  title,
  children,
  width = "600px",
  height = "400px",
}: IPopup): JSX.Element => {
  const popup = useRef<HTMLDivElement>(null);
  const [popupHeight, setPopupHeight] = useState<string>(height);
  const [popupWidth, setPopupWidth] = useState<string>(width);

  const toHidden = (e: React.MouseEvent<HTMLElement>): void => {
    if (!popup.current) return;

    if (!popup.current.contains(e.target as HTMLElement)) {
      close();
    }
  };

  useEffect(() => {
    if (visible) {
      window.onscroll = () => false;
      const correctHeight = height.includes("px")
        ? Math.min(Number.parseFloat(height), window.innerHeight)
        : height;
      setPopupHeight(`${correctHeight}px`);

      const correctWidth = width.includes("px")
        ? Math.min(Number.parseFloat(width), window.innerWidth)
        : height;
      setPopupWidth(`${correctWidth}px`);
    } else {
      window.onscroll = () => true;
    }
  }, [visible, height, width]);

  const style = { width: popupWidth, height: popupHeight };

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
      <div ref={popup} className="popup" style={style}>
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
