import "./Button.scss";

interface ButtonProps {
  click: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  text?: string;
  width?: string;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  click,
  className,
  children,
  text = "Тык",
  width,
  disabled = false,
}: ButtonProps): JSX.Element => {
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
      {children ? children : text}
    </button>
  );
};
