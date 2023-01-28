import "./Image.scss";
import config from "../../configuration";

interface IImage {
  url?: string;
  height?: string;
}

export function Image({ url, height = "250px" }: IImage): JSX.Element {
  const styles = {
    height,
  };

  if (!url) {
    return (
      <div className="no-image" style={styles}>
        <div className="no-image__container"></div>
      </div>
    );
  }

  const avatarUrl = config.photoUrl + url;

  return (
    <div className="image-wrapper" style={{ width: "100%" }}>
      <img src={avatarUrl} alt="аватар" />
    </div>
  );
}
