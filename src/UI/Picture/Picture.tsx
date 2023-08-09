import { useState, useEffect } from "react";
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
  const noImgPath: string = "noimg.jpg";
  const [avatarUrl, setAvatarUrl] = useState<string>(noImgPath);
  const setImage = () => {
    const img = new Image();
    const path = `${config.photoUrl}/${url}`;

    img.onload = () => setAvatarUrl(path);
    img.onerror = () => setAvatarUrl(noImgPath);

    img.src = path;
  };

  useEffect(() => {
    setImage();
    // eslint-disable-next-line
  }, [url]);

  useMount(() => {
    setImage();
  });

  return (
    <picture className={`${className} w100`} onClick={onClick}>
      <img src={avatarUrl} alt={alt} className="w100" />
    </picture>
  );
};
