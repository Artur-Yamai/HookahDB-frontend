import "./StartingSpinner.scss";

interface ISpinner {
  loading: boolean;
}

export function StartingSpinner({ loading }: ISpinner): JSX.Element {
  return <div className={`spinner ${!loading ? "spinner--hidden" : ""}`} />;
}
