import { useState, useEffect } from "react";
import { Box, Grid, Modal, Typography, Button } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MobileStepper from "@mui/material/MobileStepper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: "0px 8px 8px -4px #1018280A",
  p: 2,
};

const Home = () => {
  // Show/Hide the main modal
  const [open, setOpen] = useState(true);
  // Show/Hide the next step modal
  const [openStepModal, setOpenStepModal] = useState(false);

  //Store the features list
  const [featuresList, setFeaturesList] = useState([]);
  const [featureCount, setFeatureCount] = useState(0);

  //Step logic
  const [activeStep, setActiveStep] = useState(0);
  let [featureIndex, setFeatureIndex] = useState(0);

  //Store the step title and descriiption
  const [stepTitle, setStepTitle] = useState(null);
  const [stepDescription, setStepDescription] = useState(null);

  // Get the json data
  const getData = () => {
    fetch("../data/site-update.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setFeaturesList(myJson);
        setFeatureCount(myJson.length);
        if (myJson.length) {
          setStepTitle(myJson[0].title);
          setStepDescription(myJson[0].description);
        }
      });
  };

  //Get the data once the page is load
  useEffect(() => {
    getData();
  }, []);

  // Function to handle the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    featureIndex = featureIndex + 1;
    setFeatureIndex(featureIndex);
    setStepTitle(featuresList[featureIndex].title);
    setStepDescription(featuresList[featureIndex].description);
  };

  // Function to handle the back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Modal
        open={openStepModal}
        onClose={() => setOpenStepModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll", textAlign: "center" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            style={{ marginBottom: "4px", fontFamily: "Nunito Sans" }}
          >
            <b>Welcome Back. Here&apos;s What&apos;s New </b>
          </Typography>

          <div className="content">
            <Typography
              variant="h6"
              component="h4"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "Nunito Sans",
                color: "#475467",
              }}
            >
              {stepTitle}
            </Typography>
            <p
              style={{
                fontSize: "14px",
                margin: "0",
                fontFamily: "Nunito Sans",
              }}
            >
              {stepDescription}
            </p>
          </div>

          <Grid container spacing={1} style={{ alignContent: "center" }}>
            <Grid
              item
              xs={12}
              md={12}
              style={{ alignContent: "center", textAlign: "center" }}
            >
              <MobileStepper
                variant="dots"
                steps={featureCount}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 500, flexGrow: 1 }}
                style={{ width: "fit-content", margin: "0 auto" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Button
                onClick={() => {
                  setOpenStepModal(false);
                  setActiveStep(0);
                }}
                variant="outlined"
                style={{
                  width: "100%",
                  color: "#242424",
                  border: "1px solid #D0D5DD",
                  textTransform: "capitalize",
                  fontFamily: "Nunito Sans",
                }}
              >
                Skip
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  color: "#fff !important",
                  backgroundColor: "#242424",
                  textTransform: "capitalize",
                  fontFamily: "Nunito Sans",
                }}
                onClick={handleNext}
                disabled={activeStep === featureCount - 1}
                // onClick={
                //   activeStep === featureCount - 1 ? handleBack : handleNext
                // }
              >
                Next
                {/* {activeStep === featureCount - 1 ? "Previous" : "Next"} */}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* <Button onClick={() => setOpen(true)}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style} style={{ outline: "none" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            style={{ marginBottom: "4px", fontFamily: "Nunito Sans" }}
          >
            <b>Welcome Back. Here&apos;s What&apos;s New</b>
          </Typography>
          {featuresList &&
            featuresList.map((feature) => (
              <div
                key={feature.id.toString()}
                className="feature"
                style={{ marginBottom: "5px" }}
              >
                <Typography
                  variant="h6"
                  component="h4"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Nunito Sans",
                    color: "#475467",
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "10px", marginRight: "2px" }}
                  />
                  {feature.title}
                </Typography>
                <p
                  style={{
                    fontSize: "14px",
                    margin: "0px 0 0 13px",
                    fontFamily: "Nunito Sans",
                    color: "#475467",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                style={{
                  width: "100%",
                  color: "#242424",
                  border: "1px solid #D0D5DD",
                  textTransform: "capitalize",
                  fontFamily: "Nunito Sans",
                }}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  setOpenStepModal(true);
                  setStepTitle(featuresList[0].title);
                  setStepDescription(featuresList[0].description);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#242424",
                  textTransform: "capitalize",
                  fontFamily: "Nunito Sans",
                }}
              >
                Let&apos;s Go
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
