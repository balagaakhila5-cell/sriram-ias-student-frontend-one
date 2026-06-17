import React from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
  unoptimized?: boolean;
}

export default function Image({
  src,
  alt,
  fill,
  className,
  style,
  ...props
}: NextImageProps) {
  const imageStyle: React.CSSProperties = {
    display: "block",
    width: fill ? "100%" : undefined,
    height: fill ? "100%" : undefined,
    objectFit: fill ? "cover" : undefined,
    objectPosition: fill ? "center" : undefined,
    ...style,
  };

  return <img src={src} alt={alt} className={className} style={imageStyle} {...props} />;
}
