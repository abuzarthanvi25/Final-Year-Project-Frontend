import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { getActiveIndex } from 'utils/helpers';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'radial-gradient(circle, rgba(0,191,102,1) 0%, rgba(0,80,43,1) 100%);',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  })
}));

function ColorlibStepIcon({ active, completed, Icon }) {
  return <ColorlibStepIconRoot ownerState={{ completed, active }}>{Icon()}</ColorlibStepIconRoot>;
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.func
};

const stepsLocal = [
  {
    title: 'Select campaign settings',
    active: false,
    completed: false,
    icon: () => <SettingsIcon />
  },
  {
    title: 'Create an ad group',
    active: false,
    completed: false,
    icon: () => <GroupAddIcon />
  },
  {
    title: 'Create an ad',
    active: false,
    completed: false,
    icon: () => <VideoLabelIcon />
  }
];

export default function CustomizedSteppers({ steps = stepsLocal }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={getActiveIndex(steps)} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() =>
                ColorlibStepIcon({
                  active: label.active,
                  completed: label.completed,
                  Icon: !label.completed ? label.icon : () => <CheckCircleIcon />
                })
              }
            >
              {label.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

CustomizedSteppers.propTypes = {
  steps: PropTypes.array
};
