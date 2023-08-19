import { useState } from 'react';
import { Box, Button, Container, TextField, Stepper, Step, StepLabel, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const QS = [
  'What is your name?',
  'Where are you from?',
  'What is your favorite color?',
  'What is your hobby?',
  'What is your hobby What is your hobby What is your hobby What is your hobby What is your hobby What is your hobby What is your hobby What is your hobby What is your hobby?'
];

const ChatInterview = ({ questions = QS }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleNext = () => {
    if (answers[activeStep] !== '') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeAnswer = (event) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <Container>
      <Stepper sx={{ display: 'flex', flexWrap: 'wrap' }} activeStep={activeStep}>
        {questions.map((question, index) => (
          <Step sx={{ display: 'flex', flexWrap: 'wrap' }} key={index}>
            <StepLabel>
              <span style={{ fontSize: '19px', fontWeight: 'bold' }}>{`${questions.length > 5 ? 'Q' : 'Question'} ${index + 1}`}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === questions.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Alert sx={{ mt: 3 }} variant="filled" severity="success">
            <Typography variant="h5">Thank you for answering all questions!</Typography>
          </Alert>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', maxWidth: '100%', flexWrap: 'wrap' }}>
            <Typography
              sx={{
                my: 2,
                ml: 1,
                backgroundColor: '#5e35b1',
                color: '#fff',
                p: 1.7,
                borderRadius: '15px',
                fontSize: '22px',
                fontWeight: 500,
                lineHeight: 1.5,
                boxShadow: '5'
              }}
              variant="body3"
            >
              Q {activeStep + 1} : {questions[activeStep]}
            </Typography>
          </Box>
          <TextField
            label="Answer"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={answers[activeStep]}
            onChange={handleChangeAnswer}
            sx={{ marginY: 2 }}
          />
          <Box>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ marginRight: 2 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={answers[activeStep] === ''}>
              {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

ChatInterview.propTypes = {
  questions: PropTypes.array
};

export default ChatInterview;
