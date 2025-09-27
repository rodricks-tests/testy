'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({ src, alt, width, height, fallback, ...props } : any) {
  const [hasError, setHasError] = useState(false);
  const isDev = process.env.NODE_ENV === "development";


  return hasError ? (
    fallback
  ) : (
    <Image
      src={src}
      alt={alt || "no alt"}
      width={width}
      height={height}
      unoptimized={isDev} // Disable optimization in development
      onLoadingComplete={(img) => {
        if (img.naturalWidth === 0) {
          setHasError(true);
        }
      }}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}