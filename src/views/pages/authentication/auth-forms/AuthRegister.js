import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
  Stack,
  Alert
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from 'utils/authentication/authProvider';
import { registerUserRequest } from 'store/reducers/userReducer';
import { unwrapResult } from '@reduxjs/toolkit';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUp, currentUser, googleSignIn } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegisterUser = (payload) => {
    setLoading(true);
    dispatch(registerUserRequest(payload))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSignUp = async ({ email, password }) => {
    try {
      await signUp(email, password);
      handleRegisterUser({ username: email?.split('@')[0], email });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const googleHandler = async () => {
    setError(null);
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 4000);
    }
  }, [error]);

  return (
    <>
      {currentUser ? (
        navigate('/')
      ) : (
        <>
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item xs={12} container alignItems="center" justifyContent="center">
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Sign up with Email address</Typography>
              </Box>
            </Grid>
          </Grid>

          <Formik
            initialValues={{
              email: '',
              password: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                if (scriptedRef.current) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  handleSignUp(values);
                }
              } catch (err) {
                console.error(err);
                if (scriptedRef.current) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={googleHandler}
                        size="large"
                        sx={{
                          color: 'grey.700',
                          backgroundColor: theme.palette.grey[50],
                          borderColor: theme.palette.grey[100]
                        }}
                      >
                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                          <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                        </Box>
                        Sign up with Google
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                      <Button
                        variant="outlined"
                        sx={{
                          cursor: 'unset',
                          m: 2,
                          py: 0.5,
                          px: 7,
                          borderColor: `${theme.palette.grey[100]} !important`,
                          color: `${theme.palette.grey[900]}!important`,
                          fontWeight: 500,
                          borderRadius: `${customization.borderRadius}px`
                        }}
                        disableRipple
                        disabled
                      >
                        OR
                      </Button>
                      {error && (
                        <Grid item xs={12} container alignItems="center" justifyContent="center">
                          <Stack sx={{ width: '100%' }}>
                            <Alert variant="filled" severity="error">
                              {error} — check it out!
                            </Alert>
                          </Stack>
                        </Grid>
                      )}
                      <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                  </Grid>
                </Grid>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                {strength !== 0 && (
                  <FormControl fullWidth>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </FormControl>
                )}

                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="subtitle1">
                          Agree with &nbsp;
                          <Typography variant="subtitle1" component={Link} to="#">
                            Terms & Condition.
                          </Typography>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting || !checked || loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Sign up
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default FirebaseRegister;
