import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../loadingSpinner/Loader";
import { userContext } from "../../context/userData";

const NationalIdForm = ({ handleNext }) => {
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useContext(userContext);

  const hanldeUploadImg = (img, setImg) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      setImg(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(img);
  };

  const handleSubmit = async () => {
    if (!frontImg || !backImg) {
      toast.error("please fill all fields");
    } else {
      setLoading(true);
      axios
        .post("http://localhost:3000/api/auth", {
          method: "POST",
          url: "https://valifystage.com/api/o/token/",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          // console.log(result.data);
          setUserData({ accessToken: result.data.access_token });

          let data = JSON.stringify({
            document_type: "egy_nid",
            data: {
              bundle_key: "3751eb83f94d4e8492f212f1ba1ebc15",
              front_img: frontImg,
              back_img: backImg,
              lang: "en",
            },
          });

          let config = {
            method: "POST",
            url: "https://valifystage.com/api/v1/ocr/",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                result.data.token_type + " " + result.data.access_token,
            },
            data: data,
          };

          axios
            .post("http://localhost:3000/api/ocr", config)
            .then((data) => {
              // console.log(data);
              setLoading(false);

              if (data.data.result) {
                setUserData((d) => {
                  return {
                    ...d,
                    info: data.data.result,
                    transactionId: data.data.transaction_id,
                  };
                });
                handleNext();
              } else {
                toast.error("Please upload good images of your national id");
              }
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
              toast.error("error");
            });
        })
        .catch((e) => console.log(e));
    }
  };

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

      {loading ? (
        <>
          <Loader />
          <p className="mb-40">Reading your Data.. this may take a while </p>
        </>
      ) : (
        <form className="nationalid__form">
          <p className="form__label"> front image of your national id </p>
          <div className="form__control">
            <label className="fileContainer">
              Upload front image
              <input
                type="file"
                onChange={(e) =>
                  hanldeUploadImg(e.target.files[0], setFrontImg)
                }
              />
            </label>
          </div>
          <p className="form__label mt-50">back image of your national id</p>
          <div className="form__control">
            <label className="fileContainer">
              Upload back image
              <input
                type="file"
                onChange={(e) => hanldeUploadImg(e.target.files[0], setBackImg)}
              />
            </label>
          </div>

          <Button
            onClick={handleSubmit}
            variant="contained"
            className="mt-50"
            color="primary"
          >
            submit
          </Button>
        </form>
      )}
    </>
  );
};

export default NationalIdForm;
