import React, { useState } from "react";

/**
 * LazyImage Component
 * Provides native lazy loading with fallback support
 */
const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderBg = "bg-gray-200 dark:bg-gray-700",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`
        ${className}
        ${!isLoaded ? placeholderBg : ""}
        transition-opacity duration-300
        ${isLoaded ? "opacity-100" : "opacity-0"}
      `}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true);
        setIsLoaded(true);
      }}
      {...props}
    />
  );
};

export default LazyImage;
