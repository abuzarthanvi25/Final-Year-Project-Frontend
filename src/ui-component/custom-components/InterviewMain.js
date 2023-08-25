import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import { useState } from 'react';
import TabPanel from './Tabs/TabPanel';
import ChatInterview from './Tabs/ChatInterview';
import VoiceToVoiceInterview from './Tabs/VoiceToVoiceInterview';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const InterviewMain = ({ handleBackStep, handleDisable, handleEnable, handleLoading, handleNextStep }) => {
  const [value, setValue] = useState(0);
  const [questions, setQuestions] = useState([]);

  const { allQuestions } = useSelector((state) => state.interview);

  useEffect(() => {
    if (allQuestions) {
      setQuestions(allQuestions);
    }
  }, [allQuestions]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid sx={{ my: 5, p: 0 }} container>
        <Grid item lg={1} md={2} sm={12} xs={12}>
          <Tabs centered orientation="vertical" value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<VoiceChatIcon />} label="Chat Interview" {...a11yProps(0)} />
            <Tab icon={<PsychologyIcon />} label="Simulated Interview" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item lg={11} md={10} sm={12} xs={12}>
          <TabPanel value={value} index={0}>
            <ChatInterview
              handleEnable={handleEnable}
              handleDisable={handleDisable}
              questions={questions}
              handleBackStep={handleBackStep}
              handleLoading={handleLoading}
              handleNextStep={handleNextStep}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <VoiceToVoiceInterview />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

InterviewMain.propTypes = {
  handleBackStep: PropTypes.func,
  handleDisable: PropTypes.func,
  handleEnable: PropTypes.func,
  handleLoading: PropTypes.func,
  handleNextStep: PropTypes.func
};

export default InterviewMain;
