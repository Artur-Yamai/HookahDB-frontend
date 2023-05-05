import "./Button.scss";

interface IButton {
  click: (event: React.MouseEvent<HTMLElement>) => void;
  text?: string;
  width?: string;
  className?: string;
  disabled?: boolean;
}

export function Button({
  click,
  className,
  text = "Тык",
  width,
  disabled = false,
}: IButton): JSX.Element {
  const style = {
    width,
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => click(e);

  return (
    <button
      className={`c-button ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
