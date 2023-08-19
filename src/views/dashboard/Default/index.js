import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import InterviewCard from 'ui-component/custom-components/InterviewCard';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PsychologyIcon from '@mui/icons-material/Psychology';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const interviewCardsData = [
    {
      title: 'Technical',
      subTitle: 'For Technical students wanting to evalute their technical skills',
      icon: () => <CodeIcon />
    },
    {
      title: 'Generalized',
      subTitle: 'Generalized interview for sentiment and career evaluation',
      icon: () => <FormatListBulletedIcon />
    },
    {
      title: 'Job Specific',
      subTitle: 'Job Specific interview for tailor-made interviews',
      icon: () => <AdsClickIcon />
    },
    {
      title: 'Psychological',
      subTitle: 'Interviews for personality and traits evaluation',
      icon: () => <PsychologyIcon />
    }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Box style={{ textAlign: 'center', fontSize: '30px', margin: '20px 0px' }}>
          <Typography variant="body3">Interviews Available</Typography>
        </Box>
        <Grid container spacing={gridSpacing}>
          {interviewCardsData &&
            interviewCardsData.map((interview, index) => (
              <Grid key={index} item lg={6} md={4} sm={6} xs={12}>
                <InterviewCard Interview={interview} isLoading={isLoading} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
