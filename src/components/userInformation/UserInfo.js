import React, { useContext } from "react";
import { userContext } from "../../context/userData";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./userInfo.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const UserInfo = ({ handleNext, handleBack }) => {
  const [userData] = useContext(userContext);
  const classes = useStyles();

  return (
    <>
      <div className="userInfo">
        <div className="userInfo__row">
          <p>
            <span>First Name :</span> {userData.info.first_name}
          </p>
          <p>
            <span>Full Name :</span>
            {userData.info.first_name} {userData.info.full_name}
          </p>
        </div>
        <div className="userInfo__row">
          <p>
            <span>Gender :</span> {userData.info.gender}
          </p>
          <p>
            <span>Profession :</span> {userData.info.profession}
          </p>
        </div>
        <div className="userInfo__row">
          <p>
            <span>Date of Birth :</span> {userData.info.date_of_birth}
          </p>
          <p>
            <span>Marital Status :</span> {userData.info.marital_status}
          </p>
        </div>
        <div className="userInfo__row">
          <p>
            <span>Area :</span> {userData.info.area}
          </p>
          <p>
            <span>Street :</span> {userData.info.street}
          </p>
        </div>
        <div className="userInfo__row">
          <p>
            <span>Religion :</span> {userData.info.religion}
          </p>
        </div>
        <div className="userInfo__row">
          <p>
            <span>Release_date :</span> {userData.info.release_date}
          </p>
          <p>
            <span>Expiry_date :</span> {userData.info.expiry_date}
          </p>
        </div>
        {userData.info.husband_name ? (
          <>
            <p>
              <span>Husband Name :</span> {userData.info.husband_name}
            </p>
          </>
        ) : null}
      </div>

      <Button onClick={handleBack} className={classes.backButton}>
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Confirm
      </Button>
    </>
  );
};

export default UserInfo;
