import PropTypes from 'prop-types';
import { Avatar, Paper, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Webcam from 'react-webcam'; // Import the webcam library
// import { useState } from 'react';
import { useRef } from 'react';

const ControlBar = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '8px'
});

const ControlIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white, // Icon color,
  fontSize: '12px'
}));

const VideoTile = ({ name, avatarUrl, isMuted, isCameraOn, disabled, type }) => {
  // const [cameraStream, setCameraStream] = useState(null); // To store the webcam stream
  const webcamRef = useRef(null); // Ref to the webcam component

  const VideoTileRoot = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '350px',
    background: '#1f1f1f', // Dark background color
    borderRadius: theme.spacing(4),
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.2s ease-in-out',
    transform: !isMuted ? 'scale(1.05)' : 'none',
    border: `3px solid ${!isMuted ? '#3F7071' : 'transparent'}`,
    marginTop: '20px'
  }));

  const VideoTileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(25), // Larger avatar size
    height: theme.spacing(25),
    marginBottom: theme.spacing(2),
    border: `4px solid ${!isMuted ? '#3F7071' : theme.palette.secondary.main}`,
    transition: 'transform 0.2s ease-in-out',
    transform: !isMuted ? 'scale(1.05)' : 'none'
  }));

  // const toggleWebcam = async () => {
  //   if (isCameraOn) {
  //     if (cameraStream) {
  //       cameraStream.getTracks().forEach((track) => track.stop());
  //     }
  //     setCameraStream(null);
  //   } else {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setCameraStream(stream);
  //   }
  //   handleCameraToggle(); // Update the camera toggle state
  // };

  return (
    <VideoTileRoot style={{ pointerEvents: disabled ? 'none' : 'all' }} elevation={0}>
      {isCameraOn && type?.type == 'Interviewee' ? (
        <Box
          component={VideoTileAvatar} // Use the same styles as VideoTileAvatar
        >
          <Webcam
            audio={false}
            mirrored
            ref={webcamRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        </Box>
      ) : (
        <VideoTileAvatar alt={name} src={avatarUrl} />
      )}
      <Typography variant="h5" color={'lightgray'} align="center">
        {name}
      </Typography>
      <ControlBar>
        <ControlIconButton onClick={type.speak}>
          {isMuted ? <MicOffIcon /> : <MicIcon />} {type?.type == 'AI' ? 'Speak Question' : 'Answer Question'}
        </ControlIconButton>
        {/* {type?.type == 'Interviewee' ? (
          <ControlIconButton
            onClick={() => {
              handleCameraToggle();
              toggleWebcam();
            }}
          >
            {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </ControlIconButton>
        ) : null} */}
      </ControlBar>
    </VideoTileRoot>
  );
};

VideoTile.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  type: PropTypes.object,
  disabled: PropTypes.bool,
  handleCameraToggle: PropTypes.func,
  handleMicToggle: PropTypes.func,
  isCameraOn: PropTypes.bool,
  isMuted: PropTypes.bool
};

export default VideoTile;
