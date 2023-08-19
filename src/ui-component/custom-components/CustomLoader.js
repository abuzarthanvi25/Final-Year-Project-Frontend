import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { gridSpacing } from 'store/constant';

const texts = ['Loading...', 'Please wait...', 'Almost there...'];

const CustomLoader = ({ loadingTexts = texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [loadingTexts]);

  return (
    <Paper
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        boxShadow: '3',
        backgroundColor: '#E7E7E7'
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <CircularProgress size={180} color="secondary" />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body3" component={'p'} style={{ marginTop: 16, fontSize: '55px', lineHeight: '55px' }}>
              {loadingTexts[currentTextIndex]}
            </Typography>
          </Grid>
        </Grid>
      </motion.div>
    </Paper>
  );
};

CustomLoader.propTypes = {
  loadingTexts: PropTypes.array
};

export default CustomLoader;
