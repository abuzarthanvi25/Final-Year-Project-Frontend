import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { getPastEvaluationsRequest } from 'store/reducers/userReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import CustomLoader from 'ui-component/custom-components/CustomLoader';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import EvaluationMain from 'ui-component/custom-components/EvaluationMain';
// import { toTitleCase } from 'utils/helpers';

const PastEvaluations = () => {
  const { user, pastEvaluations } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleGetPastEvaluations = (payload) => {
    setLoading(true);
    dispatch(getPastEvaluationsRequest(payload))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      handleGetPastEvaluations({ user_id: user?.id });
    }
  }, []);

  console.log(pastEvaluations);

  return (
    <MainCard title="Past Evaluations">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Box>
            <Grid container spacing={1}>
              {pastEvaluations && pastEvaluations.length > 0 ? (
                pastEvaluations.map((evaluation, index) => (
                  <Grid key={index} item lg={6} md={6} sm={6} xs={12}>
                    <EvaluationMain
                      evaluation={evaluation?.evaluation_message}
                      evalutionPoints={evaluation?.evaluation}
                      interviewDate={evaluation?.evaluation_date}
                      intervieweeName={evaluation?.user_name ?? evaluation.user.username}
                      interviewer="AI BOT"
                    />
                  </Grid>
                ))
              ) : (
                <Box sx={{ width: '100%', height: '65vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '20px' }} variant="body3">
                    No Previous Evaluations
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        </>
      )}
    </MainCard>
  );
};

export default PastEvaluations;
