import NextImage, { type ImageProps } from "next/image";

const DEFAULT_QUALITY = 60;

export default function OptimizedImage(props: ImageProps) {
  return <NextImage {...props} quality={props.quality ?? DEFAULT_QUALITY} />;
}
