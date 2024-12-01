"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextProps {
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;
  timestamp: string | null;
  setTimestamp: (timestamp: string | null) => void;
  ipfsHash: string | null;
  setIpfsHash: (hash: string | null) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export function ImageProvider ({ children }: { children: ReactNode }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{
        imageSrc,
        setImageSrc,
        timestamp,
        setTimestamp,
        ipfsHash,
        setIpfsHash,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export function useImageContext (): ImageContextProps {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
