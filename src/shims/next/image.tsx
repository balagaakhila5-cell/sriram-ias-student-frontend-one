import React from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
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
  quality: _quality,
  priority: _priority,
  ...props
}: NextImageProps) {
  const imageStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }
    : {
        display: "block",
        ...style,
      };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imageStyle}
      {...props}
    />
  );
}
