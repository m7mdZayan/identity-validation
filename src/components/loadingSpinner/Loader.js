import React from "react";
import LoadingSpinner from "react-loader-spinner";

const Loader = () => {
  return (
    <LoadingSpinner
      type="Puff"
      style={{ textAlign: "center", margin: "5rem auto" }}
      color="#303f9f"
      height={100}
      width={100}
    />
  );
};

export default Loader;
