"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { RainbowButton } from "@/src/components/ui/rainbow-button";
// import "./styles.css";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function App() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <header>
        <h1>Click & Extract!</h1>
      </header>
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
      {url && (
        <>
          <div className="w-full flex flex-col items-center absolute h-screen mt-24 font-grotesk">
            <img className="rounded-xl" src={url} alt="Screenshot" />
          </div>
          <div className="w-full flex flex-col items-center mt-96 font-grotesk">
            <div className="flex flex-row gap-4">
              <RainbowButton
                className=""
                onClick={() => {
                  setUrl(null);
                }}
              >
                Delete
              </RainbowButton>
              <RainbowButton
                className=""
                onClick={() => {
                  setUrl(null);
                }}
              >
                Scan
              </RainbowButton>
            </div>
          </div>
        </>
      )}
    </>
  );
}
