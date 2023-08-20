import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';

const EvaluationMain = ({
  intervieweeName = 'User name',
  interviewDate = `${new Date().toUTCString().toString()}`,
  evaluation = '',
  interviewer = 'Artificial Intelligence BOT',
  evalutionPoints = '10'
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
      <Paper elevation={5} sx={{ padding: '35px', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h2" gutterBottom>
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
        <Typography variant="h3" sx={{ marginTop: '10px' }}>
          Overall Evaluation:
        </Typography>
        <Typography variant="h6">Evaluation Points: {evalutionPoints}/100</Typography>
        <Typography variant="h5">Summary: {evaluation}</Typography>
        <Typography variant="body3"> {evaluation}</Typography>
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
