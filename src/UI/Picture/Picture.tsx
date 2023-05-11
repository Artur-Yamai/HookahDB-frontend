import config from "../../configuration";

interface IImage {
  url?: string;
  alt?: string;
  className?: string;
}

export function Picture({
  url,
  className,
  alt = "Изображение",
}: IImage): JSX.Element {
  const avatarUrl = url ? config.photoUrl + url : "noimg.jpg";

  return (
    <picture className={`${className} w100`}>
      <img src={avatarUrl} alt={alt} className="w100" />
    </picture>
  );
}
