import Stepper from 'ui-component/custom-components/Stepper';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { Alert, Box, Button, Grid } from '@mui/material';
import { getActiveIndex, handleBack, handleNext, handleFinish, handleStart } from 'utils/helpers';
import DetailsSubmission from 'ui-component/custom-components/DetailsSubmission';
import { Stack } from '@mui/system';
import InterviewMain from 'ui-component/custom-components/InterviewMain';
import CustomLoader from 'ui-component/custom-components/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import { submitDetailsRequest, resetStateRequest } from 'store/reducers/interviewReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import EvaluationMain from 'ui-component/custom-components/EvaluationMain';

const TakeAnInterview = () => {
  const dispatch = useDispatch();
  const { userDetails, evaluationDetails } = useSelector((state) => state.interview);

  const [steps, setSteps] = useState([
    {
      title: 'Details Submission',
      active: true,
      completed: false,
      icon: () => <FeedIcon />
    },
    {
      title: 'Interview',
      active: false,
      completed: false,
      icon: () => <InterpreterModeIcon />
    },
    {
      title: 'Evaluation',
      active: false,
      completed: false,
      icon: () => <AutoModeIcon />
    }
  ]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  const handleSubmitDetails = (formdata) => {
    setLoading(true);
    //api for details submission
    console.log(formdata);
    if (formdata) {
      dispatch(submitDetailsRequest(formdata))
        .then(unwrapResult)
        .then(() => {
          setMessage('Your details have been submitted successfully');
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
      console.log(disabledNext);
    }
  };

  const handleDisable = () => setDisabledNext(true);
  const handleEnable = () => setDisabledNext(false);
  const handleLoading = (bool) => setLoading(bool);

  const handleRetakeInterview = () => {
    handleStart(steps, setSteps, evaluationDetails);
    dispatch(resetStateRequest());
  };

  return (
    <MainCard title="Take An Interview">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="secondary"
              variant="contained"
              disabled={getActiveIndex(steps) === 0}
              onClick={() => handleBack(steps, setSteps)}
              startIcon={<ArrowBackIcon />}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Stepper steps={steps} />
            <Button
              disabled={disabledNext || steps[steps.length - 1].completed}
              endIcon={<ArrowForwardIcon />}
              color="primary"
              variant="contained"
              onClick={() =>
                getActiveIndex(steps) === steps.length - 1 ? handleFinish(steps, setSteps, evaluationDetails) : handleNext(steps, setSteps)
              }
            >
              {getActiveIndex(steps) === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          <>
            {getActiveIndex(steps) == 0 ? (
              <>
                {message ? (
                  <Grid item xs={12} sx={{ m: 2 }} container alignItems="center" justifyContent="center">
                    <Stack sx={{ width: '100%' }}>
                      <Alert variant="filled" severity={'success'}>
                        {message}
                      </Alert>
                    </Stack>
                  </Grid>
                ) : null}
                <DetailsSubmission isSubmitted={message || userDetails ? true : false} handleSubmitDetails={handleSubmitDetails} />
              </>
            ) : getActiveIndex(steps) == 1 ? (
              <>
                <InterviewMain
                  handleDisable={handleDisable}
                  handleEnable={handleEnable}
                  handleLoading={handleLoading}
                  loading={loading}
                  handleBackStep={() => handleBack(steps, setSteps)}
                  handleNextStep={() => handleNext(steps, setSteps)}
                />
              </>
            ) : getActiveIndex(steps) == 2 ? (
              <>
                <EvaluationMain
                  intervieweeName={userDetails?.name}
                  evaluation={evaluationDetails?.evaluation_message}
                  evalutionPoints={evaluationDetails?.evaluation}
                />
                {evaluationDetails ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleRetakeInterview} variant="contained">
                      Retake Interview
                    </Button>
                  </Box>
                ) : null}
              </>
            ) : null}
          </>
        </>
      )}
    </MainCard>
  );
};

export default TakeAnInterview;
