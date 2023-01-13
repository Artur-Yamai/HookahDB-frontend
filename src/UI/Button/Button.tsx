import "./Button.scss";

interface IButton {
  click: (event: React.MouseEvent<HTMLElement>) => void;
  text?: string;
  width?: string;
  className?: string;
}

export function Button({
  click,
  className,
  text = "Тык",
  width,
}: IButton): JSX.Element {
  const style = {
    width,
  };

  function onClick(e: React.MouseEvent<HTMLElement>) {
    click(e);
  }

  return (
    <button className={`c-button ${className}`} style={style} onClick={onClick}>
      {text}
    </button>
  );
}
