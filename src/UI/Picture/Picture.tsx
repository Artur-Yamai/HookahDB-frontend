import { useState } from "react";
import config from "../../configuration";
import { useMount } from "../../hooks";

interface PictureProps {
  url?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export const Picture = ({
  url,
  className,
  alt = "Изображение",
  onClick,
}: PictureProps): JSX.Element => {
  const [avatarUrl, setAvatarUrl] = useState<string>("noimg.jpg");

  useMount(() => {
    const img = new Image();
    const path = config.photoUrl + url;

    img.onload = () => setAvatarUrl(path);
    img.onerror = () => setAvatarUrl("noimg.jpg");

    img.src = path;
  });

  return (
    <picture className={`${className} w100`} onClick={onClick}>
      <img src={avatarUrl} alt={alt} className="w100" />
    </picture>
  );
};
