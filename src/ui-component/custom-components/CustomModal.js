import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';

const CustomModal = ({ open, message, onConfirm, handleClose, subtitle, disabled = false }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="body3" sx={{ fontSize: '22px' }}>
          Confirm Submission
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2" component={'span'} sx={{ fontSize: '16px' }}>
            {message}
          </Typography>
        </DialogContentText>
        <DialogContentText>
          <Typography variant="subtitle1" component={'span'} sx={{ fontSize: '14px' }}>
            {subtitle}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button disabled={disabled} variant="contained" onClick={onConfirm} color="success">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool.req
};

export default CustomModal;
