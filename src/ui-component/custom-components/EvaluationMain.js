import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';

const EvaluationMain = ({
  intervieweeName = 'User name',
  interviewDate = `${new Date().toUTCString().toString()}`,
  evaluation = 'The interviewee scored an average of 97.56 out of 100, indicating that they gave satisfactory responses to the questions asked. The interviewee was confident when speaking, and their responses were well thought-out and provided insight into the topics discussed. They were able to articulate their thoughts and opinions in an articulate manner, while also demonstrating a sound knowledge of the topics discussed. Overall, the interviewee impressed with their responses and overall performance.',
  interviewer = 'Artificial Intelligence BOT',
  evalutionPoints = '97.56'
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
      <Paper elevation={5} sx={{ padding: '35px', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h2" sx={{ my: 2, textAlign: 'center' }} gutterBottom>
          Interview Evaluation Summary
        </Typography>
        <Typography variant="h4" gutterBottom>
          Interviewee: {intervieweeName}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Interviewed By: {interviewer}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Interview Date: {interviewDate}
        </Typography>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Overall Evaluation:
        </Typography>
        <Typography variant="body3" color={'primary'} sx={{ fontWeight: 'bolder', fontSize: '14px' }}>
          Evaluation Points: {evalutionPoints}/100
        </Typography>
        <Typography sx={{ fontweight: 'bolder', fontSize: '20px', mt: 2 }} variant="body3" component={'p'}>
          Summary:
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body3" component={'p'}>
          {evaluation}
        </Typography>
      </Paper>
    </Box>
  );
};

EvaluationMain.propTypes = {
  intervieweeName: PropTypes.string,
  interviewDate: PropTypes.string,
  evaluation: PropTypes.string,
  interviewer: PropTypes.string,
  evalutionPoints: PropTypes.string
};

export default EvaluationMain;
