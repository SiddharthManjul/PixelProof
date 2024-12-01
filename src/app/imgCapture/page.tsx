"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { RainbowButton } from "@/src/components/ui/rainbow-button";
import UploadToPinata from "@/src/utils/config";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "ivory-tough-leech-456.mypinata.cloud",
});


const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function App() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const urlRef = useRef<string | null>(null);
  const timestampRef = useRef<string | null>(null);
  const locationRef = useRef<{ lat: number; lng: number } | null>(null);
  const imageSrcRef = useRef<string | null>(null);
  const [isLocationReady, setIsLocationReady] = useState<boolean>(false);
  const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
  const ipfsHashRef = useRef<string | null>(null);

  useEffect(() => {
    timestampRef.current = new Date().toISOString();
  }, []);

  const capture = useCallback(() => {
    if (!timestampRef.current) {
      console.log("Timestamp is not available yet.");
      return;
    }
    const capturedImageSrc = webcamRef.current?.getScreenshot();
    if (capturedImageSrc) {
      imageSrcRef.current = capturedImageSrc;
      urlRef.current = capturedImageSrc;
      setIsImageCaptured(true);
    }

    console.log("Captured Image URL:", capturedImageSrc);
    console.log("Timestamp:", timestampRef.current);
    console.log("Image Src", urlRef.current);
  }, [webcamRef]);

  const handleUpload = async () => {
    if (imageSrcRef.current) {
      // Remove the data URL prefix
      const base64Data = imageSrcRef.current.replace(/^data:image\/\w+;base64,/, '');

      console.log(base64Data);
      
      try {
        const uploadResult = await pinata.upload.json({base64Data});
        console.log('Upload successful:', uploadResult);
        console.log(uploadResult.IpfsHash);
        ipfsHashRef.current = uploadResult.IpfsHash;
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    console.log("Uploaded",ipfsHashRef);
    
  };

  const handleDelete = () => {
    urlRef.current = null;
    imageSrcRef.current = null;
    setIsImageCaptured(false);
  };

  return (
    <>
      {isCaptureEnable || (
        <div className="w-full flex flex-col items-center absolute top-36 font-grotesk">
          <RainbowButton onClick={() => setCaptureEnable(true)}>
            Start
          </RainbowButton>
        </div>
      )}
      {isCaptureEnable && (
        <>
          <div className="w-full flex flex-col items-center absolute top-36 font-josefin">
            <RainbowButton onClick={() => setCaptureEnable(false)}>
              End
            </RainbowButton>
          </div>
          <div className="flex flex-col items-center mt-60">
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-xl"
            />
          </div>
          <div className="w-full flex flex-col items-center absolute h-screen mt-8 font-grotesk">
            <RainbowButton onClick={capture}>Capture</RainbowButton>
          </div>
        </>
      )}
      {isImageCaptured && urlRef.current && (
        <>
          <div className="w-full flex flex-col items-center absolute h-screen mt-24 font-grotesk">
            <img className="rounded-xl" src={urlRef.current} alt="Screenshot" />
          </div>
          <div className="w-full flex flex-col items-center mt-96 font-grotesk">
            <div className="flex flex-row gap-4">
              <RainbowButton onClick={handleDelete}>
                Delete
              </RainbowButton>
              <RainbowButton>
                Scan
              </RainbowButton>
            </div>
          </div>
        </>
      )}
      {isLocationReady && locationRef.current && (
        <div className="mt-4 font-grotesk">
          <h3>Location Information:</h3>
          <p>
            <strong>Latitude:</strong> {locationRef.current.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {locationRef.current.lng}
          </p>
        </div>
      )}
      {isImageCaptured && urlRef.current && (
        <div className="w-full flex flex-col items-center mt-8">
          <RainbowButton onClick={handleUpload}>
            Upload to Pinata
          </RainbowButton>
        </div>
      )}
      {timestampRef.current && (
        <div className="mt-4 font-grotesk">
          <h3>Timestamp:</h3>
          <p>{new Date(timestampRef.current).toLocaleString()}</p>
        </div>
      )}
    </>
  );
}