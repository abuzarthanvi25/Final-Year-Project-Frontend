import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobListingsRequest } from 'store/reducers/jobListingReducer';
import MainCard from 'ui-component/cards/MainCard';
import CustomLoader from 'ui-component/custom-components/CustomLoader';
import JobListingCard from 'ui-component/custom-components/JobListingCard';
import SearchBar from 'ui-component/custom-components/Searchbar';

const JobListings = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { jobListings } = useSelector((state) => state.jobs);

  const handleGetJobListings = (payload) => {
    setLoading(true);
    dispatch(getJobListingsRequest(payload ?? null))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      handleGetJobListings({ searchQuery });
    }
  };

  console.log(jobListings.count);

  useEffect(() => {
    handleGetJobListings();
  }, []);
  return (
    <MainCard title="Job Listings">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <SearchBar onSearch={handleSearch} />
            {jobListings?.count ? (
              <Typography variant="caption" color={'secondary'}>
                Showing {jobListings?.count} results
              </Typography>
            ) : (
              <Typography variant="caption" color={'info'}>
                No Results found
              </Typography>
            )}
          </Box>
          <Grid container spacing={3}>
            {jobListings?.results && jobListings?.results.length > 0 ? (
              jobListings?.results.map((job, index) => (
                <Grid key={index} item md={12} lg={12} sm={12} xs={12}>
                  <JobListingCard
                    company_name={job?.company_name}
                    date_posted={job?.date_posted}
                    keywords={job?.keywords}
                    logo={job?.logo}
                    remote={job?.remote}
                    role={job?.role}
                    text={job?.text}
                    url={job?.url}
                  />
                </Grid>
              ))
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Typography variant="caption" color={'info'}>
                  No Results Found
                </Typography>
              </Box>
            )}
          </Grid>
        </>
      )}
    </MainCard>
  );
};

export default JobListings;
