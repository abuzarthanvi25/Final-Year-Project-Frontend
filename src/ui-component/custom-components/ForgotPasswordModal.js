import React from 'react';
import { Modal, Backdrop, Fade, TextField, Button, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const ForgotPasswordModal = ({ open, onClose, sendEmail, handleClose, exceptionHandling }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  const handleResetPassword = async (email) => {
    try {
      await sendEmail(email);
      onClose();
    } catch (error) {
      exceptionHandling(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.email) {
        handleResetPassword(values?.email);
      }
      handleClose();
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: (theme) => theme.shadows[5],
          p: 5,
          borderRadius: '20px'
        }}
      >
        <Fade in={open}>
          <div>
            <Typography variant="h2" gutterBottom>
              Forgot Password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{
                  my: 2
                }}
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary">
                  Send Reset Email
                </Button>
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Box>
    </Modal>
  );
};

ForgotPasswordModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  sendEmail: PropTypes.func,
  handleClose: PropTypes.func,
  exceptionHandling: PropTypes.func
};

export default ForgotPasswordModal;
