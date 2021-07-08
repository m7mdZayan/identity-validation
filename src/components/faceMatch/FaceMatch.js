import React, { useRef, useState, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { userContext } from "../../context/userData";
import Loader from "../loadingSpinner/Loader";
import toast, { Toaster } from "react-hot-toast";
import { MdVerifiedUser } from "react-icons/md";

const FaceMatch = ({ handleReset, handleBack }) => {
  const webCamRef = useRef(null);
  const [userSelfie, setUserSelfie] = useState("");
  const [userData] = useContext(userContext);
  const initialRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [identityVerified, setIdentityVerified] = useState(false);

  const sendImg = () => {
    setLoading(true);
    let data = JSON.stringify({
      bundle_key: "3751eb83f94d4e8492f212f1ba1ebc15",
      first_img: userSelfie,
      transaction_id: userData.transactionId,
    });

    let config = {
      method: "post",
      url: "https://valifystage.com/api/v1/face/match/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.accessToken}`,
      },
      data: data,
    };

    axios
      .post("http://localhost:3000/api/facematch", config)
      .then(function (response) {
        setLoading(false);

        if (response.data.result.is_similar) {
          setIdentityVerified(true);
        } else {
          toast.error("identity not verified! please take another photo", {
            duration: 4000,
          });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const captureImg = () => {
    setUserSelfie(webCamRef.current.getScreenshot().split(",")[1]);
    // sendImg();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      sendImg();
    }
  }, [userSelfie]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "25px",
          },
        }}
      />

      <div className="nationalid__form">
        {loading ? (
          <>
            <Loader />
            <p className="mb-40">verifing your identity ... </p>
          </>
        ) : !identityVerified ? (
          <>
            <Webcam ref={webCamRef} />
            <Button
              onClick={captureImg}
              variant="contained"
              color="primary"
              className="button--center"
            >
              take photo
            </Button>
            <Button onClick={handleBack}>Back</Button>
          </>
        ) : (
          <div className="verification">
            <MdVerifiedUser size="5em" color="#7e7e7e" />
            <p className="mb-40">your identity is verified </p>
            <Button variant="contained" color="primary" onClick={handleReset}>
              finish
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default FaceMatch;
