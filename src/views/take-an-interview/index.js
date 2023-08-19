import Stepper from 'ui-component/custom-components/Stepper';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { Alert, Box, Button, Grid, Typography } from '@mui/material';
import { getActiveIndex, handleBack, handleNext } from 'utils/helpers';
import DetailsSubmission from 'ui-component/custom-components/DetailsSubmission';
import { Stack } from '@mui/system';

const TakeAnInterview = () => {
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

  const handleSubmitDetails = (formdata) => {
    //api for details submission
    console.log(formdata);
    setMessage('Your details have been submitted successfully');
  };

  return (
    <MainCard title="Take An Interview">
      <Stepper steps={steps} />
      <Box>
        <Typography variant="h4" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
          Step {getActiveIndex(steps) + 1} : <span style={{ color: '#00819E' }}>{steps[getActiveIndex(steps)].title}</span>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="secondary"
            variant="contained"
            disabled={getActiveIndex(steps) === 0}
            onClick={() => handleBack(steps, setSteps)}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button color="primary" variant="contained" onClick={() => handleNext(steps, setSteps)}>
            {getActiveIndex(steps) === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
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
            <DetailsSubmission isSubmitted={message ? true : false} handleSubmitDetails={handleSubmitDetails} />
          </>
        ) : getActiveIndex(steps) == 1 ? (
          <></>
        ) : getActiveIndex(steps) == 2 ? (
          <></>
        ) : null}
      </>
    </MainCard>
  );
};

export default TakeAnInterview;
