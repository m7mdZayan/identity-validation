import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NationalIdForm = () => {
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

  const hanldeUploadImg = (img, setImg) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      setImg(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const handleSubmit = () => {
    if (!frontImg || !backImg) {
      toast.error("please fill all fields");
    }

    console.log(frontImg);
    console.log(backImg);
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
      <form className="nationalid__form">
        <p className="form__label"> front image of your national id </p>
        <div className="form__control">
          <label className="fileContainer">
            Upload front image
            <input
              type="file"
              onChange={(e) => hanldeUploadImg(e.target.files[0], setFrontImg)}
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
    </>
  );
};

export default NationalIdForm;
