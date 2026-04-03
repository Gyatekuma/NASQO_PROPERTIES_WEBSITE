import NextImage, { type ImageProps } from "next/image";

const DEFAULT_QUALITY = 60;

export default function OptimizedImage(props: ImageProps) {
  const { priority, loading, quality, ...rest } = props;
  return (
    <NextImage
      {...rest}
      quality={quality ?? DEFAULT_QUALITY}
      priority={priority}
      loading={priority ? "eager" : (loading ?? "lazy")}
    />
  );
}
