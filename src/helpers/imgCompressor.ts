import imageCompression, { Options } from "browser-image-compression";

export const imgCompressor = async (
  photo: File,
  options?: Options
): Promise<File> => {
  const compressorOptions = options ?? {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  return await imageCompression(photo, compressorOptions);
};
