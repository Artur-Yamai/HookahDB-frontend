import { useState, useEffect, useRef, useMemo } from "react";
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
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const path = `${config.photoUrl}/${url}`;
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const imgTag = useRef<HTMLImageElement>(null);
  const setImage = () => {
    if (url) {
      toggleLoading(true);
      const img = new Image();

      img.onload = () => {
        setAvatarUrl(path);
        toggleLoading(false);
      };
      img.onerror = () => {
        setAvatarUrl("");
        toggleLoading(false);
      };

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

  const niImgClass = useMemo(
    () =>
      isLoading
        ? "no-image--loading"
        : avatarUrl || pictureFile
        ? ""
        : "no-image",
    [isLoading, avatarUrl, pictureFile]
  );

  return (
    <picture className={`${className} ${niImgClass} w100`} onClick={onClick}>
      {!isLoading && (avatarUrl || pictureFile) && (
        <img ref={imgTag} src={avatarUrl} alt={alt} className="w100" />
      )}
    </picture>
  );
};
