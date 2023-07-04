import config from "../../configuration";

interface PictureProps {
  url?: string;
  alt?: string;
  className?: string;
}

export const Picture = ({
  url,
  className,
  alt = "Изображение",
}: PictureProps): JSX.Element => {
  const avatarUrl = url ? config.photoUrl + url : "noimg.jpg";

  return (
    <picture className={`${className} w100`}>
      <img src={avatarUrl} alt={alt} className="w100" />
    </picture>
  );
};
