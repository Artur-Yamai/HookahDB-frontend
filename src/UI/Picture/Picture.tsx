import { useState, useEffect, useRef } from "react";
import config from "../../configuration";
import { useMount } from "hooks";
import "./Picture.scss";

interface PictureProps {
  pictureFile?: File;
  url?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export const Picture = ({
  pictureFile,
  url,
  className = "",
  alt = "Изображение",
  onClick,
}: PictureProps): JSX.Element => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const path = `${config.photoUrl}/${url}`;
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const imgTag = useRef<HTMLImageElement>(null);
  const setImage = () => {
    toggleLoading(true);
    if (url) {
      const img = new Image();

      img.onload = () => {
        setAvatarUrl(path);
        toggleLoading(false);
      };
      img.onerror = () => setAvatarUrl("");

      img.src = path;
    }
  };

  const renderFile = (): void => {
    if (!pictureFile) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const photo = e?.target?.result;
      if (!imgTag || !photo || typeof photo !== "string") return;
      imgTag.current?.setAttribute("src", photo);
    };

    reader.readAsDataURL(pictureFile);
  };

  useEffect(() => {
    setImage();
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    renderFile();
    // eslint-disable-next-line
  }, [pictureFile]);

  useMount(() => {
    setImage();
    renderFile();
  });

  return (
    <picture
      className={`${className} ${avatarUrl || pictureFile ? "" : ""} ${
        isLoading ? "no-image--loading" : ""
      } w100`}
      onClick={onClick}
    >
      {(avatarUrl || pictureFile) && (
        <img ref={imgTag} src={avatarUrl} alt={alt} className="w100" />
      )}
    </picture>
  );
};
