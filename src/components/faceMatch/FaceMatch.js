import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";

const FaceMatch = () => {
  const webCamRef = useRef(null);
  const [userSelfie, setUserSelfie] = useState("");

  const captureImg = () => {
    setUserSelfie(webCamRef.current.getScreenshot().split(",")[1]);
  };

  return (
    <div className="nationalid__form">
      <Webcam ref={webCamRef} />
      <Button
        onClick={captureImg}
        variant="contained"
        color="primary"
        className="button--center"
      >
        take photo
      </Button>

      {userSelfie}
    </div>
  );
};

export default FaceMatch;
