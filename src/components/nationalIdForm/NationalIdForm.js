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
        .then((data) => {
          console.log(data.data);

          axios
            .post("http://localhost:3000/api/ocr", {
              method: "POST",
              url: "https://valifystage.com/api/v1/ocr/",
              front_img: frontImg,
              back_img: backImg,
              access_token: data.data.token_type + " " + data.data.access_token,
            })
            .then((data) => {
              console.log(data);
              setLoading(false);
              setUserData({
                info: data.data.result,
                transactionId: data.data.transaction_id,
              });
              handleNext();
            })
            .catch((e) => {
              console.log(e);
              toast.error("error");
            });
        })
        .catch((e) => console.log(e));
    }

    // console.log(frontImg);
    // console.log(backImg);
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
