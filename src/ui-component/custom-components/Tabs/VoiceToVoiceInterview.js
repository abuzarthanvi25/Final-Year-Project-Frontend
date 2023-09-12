import { Box, Button, Grid, Typography, Stepper, Step, StepLabel, Container, TextField, Alert } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import VideoTile from 'ui-component/custom-components/VideoTile';
import { styled } from '@mui/material/styles';
import Speech from 'speak-tts';
import { useState } from 'react';
import { evaluateAnswersRequest, resetStateRequest } from 'store/reducers/interviewReducer';
import CustomModal from 'ui-component/custom-components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth } from 'utils/authentication/authProvider';
import { useNavigate } from 'react-router';

const QS = ['What is your name?', 'Where are you from?', 'What is your favorite color?', 'What is your hobby?'];

const VoiceToVoiceInterview = ({ questions = QS, handleBackStep, handleDisable, handleNextStep, handleLoading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const aiPresenter = {
    name: 'AI Interviewer',
    avatarUrl:
      'https://img.freepik.com/premium-photo/human-face-ai-man-with-big-data-futuristic-connection-with-digital-avatar-network-abstract-head-robot-artificial-intelligence-with-future-setup-metaverse-dark-backdrop_590464-162325.jpg?w=2000'
  };
  const interviewee = {
    name: 'Interviewee',
    avatarUrl:
      'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=2000'
  };

  const [isAIMuted, setisAIIsMuted] = useState(true);
  const [isIntervieweeMuted, setIsIntervieweeIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [speakText, setSpeakText] = useState('');
  const [streamedText, setStreamedText] = useState('');
  const [beginModalOpen, setBeginModalOpen] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [tabChanges, setTabChanges] = useState(0);

  const { signOutUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    dispatch(resetStateRequest());
    navigate('/pages/login');
  };

  useEffect(() => {
    // Listen for visibility change events
    if (interviewStarted) {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Page is hidden (tab is not active)
          setTabChanges((prevTabChanges) => prevTabChanges + 1);
          if (tabChanges > 3) {
            alert('You are disqualified from the interview due to changing tabs more than 3 times');
            setTimeout(() => handleLogout(), 2000);
          } else {
            alert("Please don't switch tabs while the interview is in progress");
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [tabChanges, interviewStarted]);

  const { userDetails, evaluationDetails } = useSelector((state) => state.interview);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (questions.length > 0) {
      setSpeakText(questions[activeStep]);
    }
  }, [activeStep, questions]);

  const handleNext = () => {
    if (formik.values.answers[activeStep] !== '') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    formik.handleSubmit();
    handleNext();
    setInterviewStarted(false);
    handleClose();
  };

  const handleEvaluateAnswers = (payload) => {
    handleLoading(true);
    dispatch(evaluateAnswersRequest(payload))
      .then(unwrapResult)
      .then(() => {
        handleLoading(false);
      })
      .catch((error) => {
        console.log(error);
        handleLoading(false);
        handleNextStep();
      });
  };

  console.log(user);

  const handleBeginInterview = () => {
    handleDisable();
    setBeginModalOpen(false);
    setInterviewStarted(true);
  };

  const formik = useFormik({
    initialValues: {
      answers: Array(questions.length).fill('')
    },
    onSubmit: (values) => {
      // Convert form data to an array of objects
      const answersArray = values.answers.map((answer, index) => ({
        question: questions[index],
        user_answer: answer
      }));
      console.log(answersArray);
      if (user?.id) {
        handleEvaluateAnswers({ answers: answersArray, user_id: user?.id });
      }
    }
  });

  const speech = new Speech();

  const initializeSpeech = () => {
    speech
      .init({
        lang: 'ar-SA'
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log('Speech is ready, voices are available', data);
      })
      .catch((e) => {
        console.error('An error occured while initializing : ', e);
      });
  };

  const streamWords = (words, index) => {
    if (index < words.length) {
      setStreamedText(words.slice(0, index + 1).join(' '));
      setTimeout(() => {
        streamWords(words, index + 1);
      }, 235); // Adjust the delay time between words as needed
    }
  };

  const startStreaming = () => {
    setSpeaking(true);
    setIsIntervieweeIsMuted(true);
    setisAIIsMuted(false);
    initializeSpeech();
    speech
      .speak({
        text: speakText,
        queue: false,
        listeners: {
          onstart: () => {
            const words = speakText.split(' ');
            setisAIIsMuted(false);
            streamWords(words, 0);
          },
          onend: () => {
            // setisAIIsMuted(true);
            setSpeaking(false);
            console.log('End utterance');
          },
          onresume: () => {
            console.log('Resume utterance');
          }
        }
      })
      .then(() => {
        setSpeaking(false);
        console.log('Success !');
      })
      .catch((e) => {
        setSpeaking(false);
        console.error('An error occurred :', e);
      });
  };

  const handlePauseSpeech = () => {
    speech.pause();
    setisAIIsMuted(true);
  };

  const handleResumeSpeech = () => {
    if (speech.paused()) {
      speech.resume();
      setisAIIsMuted(false);
    }
  };

  const handleStopSpeech = () => {
    if (speech.speaking()) {
      speech.cancel();
      setisAIIsMuted(true);
    }
  };

  const OuterContainer = styled(Box)(({ theme }) => ({
    background: '#5e35b1', // Dark background color for the outer container
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column', // Change the flexDirection to column
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center', // Center horizontally
    borderRadius: '20px',
    margin: '0px 10px',
    boxShadow: '7px 4px 16px -2px rgba(0,0,0,0.59)',
    padding: theme.spacing(3) // Add some padding for spacing
  }));

  const handleAIMicToggle = () => {
    setisAIIsMuted(!isAIMuted);
  };

  const handleIntervieweeMicToggle = () => {
    setIsIntervieweeIsMuted(!isIntervieweeMuted);
    if (!isIntervieweeMuted) {
      recognition.stop();
    }
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  const startListening = () => {
    setIsIntervieweeIsMuted(false);
    setisAIIsMuted(true);
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      formik.setFieldValue(`answers[${activeStep}]`, spokenText);
      setIsIntervieweeIsMuted(true);
    };
  };

  return (
    <Container>
      <div style={{ pointerEvents: evaluationDetails ? 'none' : 'all' }}>
        <CustomModal
          open={beginModalOpen && !evaluationDetails}
          handleClose={handleBackStep}
          message="Begin Interview?"
          subtitle=""
          disableBackdropClick
          onConfirm={handleBeginInterview}
          disabled={!userDetails}
        />
        <CustomModal
          open={open}
          handleClose={handleClose}
          message="Are you sure you want to submit your answers?"
          subtitle="(No corrections/alterations to the answers can be made after this)"
          onConfirm={handleConfirm}
        />
        <OuterContainer>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={12} lg={12}>
              <Stepper sx={{ display: 'flex', flexWrap: 'wrap' }} activeStep={activeStep}>
                {questions
                  ? questions.map((question, index) => (
                      <Step sx={{ display: 'flex', flexWrap: 'wrap', color: 'white' }} key={index}>
                        <StepLabel sx={{ color: 'white' }}>
                          <span style={{ fontSize: '19px', fontWeight: 'bold', color: 'white' }}>{`${
                            questions.length > 5 ? 'Q' : 'Question'
                          } ${index + 1}`}</span>
                        </StepLabel>
                      </Step>
                    ))
                  : null}
              </Stepper>
              {activeStep === questions.length || evaluationDetails ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                  <Alert sx={{ mt: 3 }} variant="filled" severity="success">
                    <Typography variant="h5">Thank you for answering all questions!</Typography>
                  </Alert>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <VideoTile
                type={{
                  type: 'AI',
                  speak: startStreaming
                }}
                handleCameraToggle={handleCameraToggle}
                handleMicToggle={handleAIMicToggle}
                name={aiPresenter.name}
                avatarUrl={aiPresenter.avatarUrl}
                isCameraOn={isCameraOn}
                isMuted={isAIMuted}
                disabled={speaking || evaluationDetails ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <VideoTile
                type={{
                  type: 'Interviewee',
                  speak: startListening
                }}
                handleCameraToggle={handleCameraToggle}
                handleMicToggle={handleIntervieweeMicToggle}
                name={interviewee.name}
                avatarUrl={interviewee.avatarUrl}
                isCameraOn={isCameraOn}
                isMuted={isIntervieweeMuted}
                disabled={evaluationDetails ? true : false}
              />
            </Grid>
          </Grid>

          {isIntervieweeMuted && !isAIMuted ? (
            <Grid sx={{ margin: '20px 0px', width: '100%' }} container justifyContent="center">
              <Grid
                sx={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}
                justifyContent="center"
                item
                xs={12}
                md={6}
                lg={8}
              >
                <Typography variant="body3" color={'white'} sx={{ fontSize: '22px', fontWeight: 600, margin: '4px 0', lineHeight: '25px' }}>
                  {streamedText}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue={formik.values.answers[activeStep] ?? ''}
                    onChange={(e) => (formik.values.answers[activeStep] = e.target.value)}
                    error={formik.touched.answers && formik.errors.answers && formik.touched.answers[activeStep]}
                    helperText={
                      formik.touched.answers &&
                      formik.errors.answers &&
                      formik.touched.answers[activeStep] &&
                      formik.errors.answers[activeStep]
                    }
                    sx={{ marginY: 2 }}
                    name={`answers[${activeStep}]`}
                    disabled={!interviewStarted}
                  />
                  <Box>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ marginRight: 2 }}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === questions.length - 1 ? handleOpen : handleNext}
                      disabled={!formik.values.answers[activeStep] || !interviewStarted}
                    >
                      {activeStep === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          )}
        </OuterContainer>
        <Box sx={{ display: 'none' }}>
          <Button onClick={() => startStreaming()} variant="contained" color="primary">
            Speak
          </Button>
          <Button onClick={handlePauseSpeech} variant="contained" color="primary">
            Pause Speaking
          </Button>
          <Button onClick={handleResumeSpeech} variant="contained" color="primary">
            Resume Speaking
          </Button>
          <Button onClick={handleStopSpeech} variant="contained" color="primary">
            Stop Speaking
          </Button>
        </Box>
      </div>
    </Container>
  );
};

VoiceToVoiceInterview.propTypes = {
  questions: PropTypes.array,
  handleBackStep: PropTypes.func,
  handleEnable: PropTypes.func,
  handleDisable: PropTypes.func,
  handleLoading: PropTypes.func,
  handleNextStep: PropTypes.func
};

export default VoiceToVoiceInterview;
