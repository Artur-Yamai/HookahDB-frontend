import config from "../../configuration";

interface IImage {
  url?: string;
}

export function Picture({ url }: IImage): JSX.Element {
  const avatarUrl = url ? config.photoUrl + url : "noimg.jpg";

  return (
    <picture className="w100">
      <img src={avatarUrl} alt="аватар" className="w100" />
    </picture>
  );
}
