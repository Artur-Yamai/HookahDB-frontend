import "./Image.scss";

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

  return <div className="image-wrapper">{/* <img src={url} /> */}</div>;
}
