import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Avatar, Grid, Box } from '@mui/material';
import { Launch as LaunchIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const JobListingCard = ({ company_name, date_posted, keywords, logo, remote, role, text, url }) => {
  const handleApplyClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={company_name} src={logo} sx={{ width: 70, height: 70 }} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4">{company_name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {new Date(date_posted).toDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h3" component="div" mt={2}>
          {role}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </CardContent>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          {remote && (
            <Grid sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} item md={12}>
              <Chip label={'Remote Job'} variant="filled" color="secondary" size="small" />
              <LocationOnIcon fontSize="small" color="secondary" />
            </Grid>
          )}
          {keywords.length > 0
            ? keywords.map((keyword, index) => (
                <Grid item key={index}>
                  <Chip label={keyword} variant="outlined" color="secondary" size="small" />
                </Grid>
              ))
            : null}
        </Grid>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Button variant="contained" color="primary" onClick={handleApplyClick} startIcon={<LaunchIcon />}>
            Apply Now
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

JobListingCard.propTypes = {
  company_name: PropTypes.string.isRequired,
  date_posted: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  logo: PropTypes.string,
  remote: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default JobListingCard;
