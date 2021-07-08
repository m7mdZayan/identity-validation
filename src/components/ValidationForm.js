import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NationalIdForm from "./nationalIdForm/NationalIdForm";
import UserInfo from "./userInformation/UserInfo";
import FaceMatch from "./faceMatch/FaceMatch";

let handleNext;
let handleBack;
let handleReset;

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

function getSteps() {
  return [
    "upload front & back image of your national id",
    "confirm your informations",
    "face match",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <NationalIdForm handleNext={handleNext} />;
    case 1:
      return <UserInfo handleNext={handleNext} handleBack={handleBack} />;
    case 2:
      return <FaceMatch handleReset={handleReset} handleBack={handleBack} />;
    default:
      return "Unknown stepIndex";
  }
}

function ValidationForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div>
            <Typography component={"div"} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ValidationForm;
