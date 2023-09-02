import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Fade, Grid, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
  father_name: Yup.string().required("Father's Name is required"),
  age: Yup.number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(18, 'Minimum age is 18')
    .required('Age is required'),
  university: Yup.string().required('University is required'),
  position_applied_for: Yup.string().required('Position Applied for is required'),
  prior_experience: Yup.number()
    .typeError('Prior Experience must be a number')
    .positive('Prior Experience must be a positive number')
    .integer('Prior Experience must be an integer')
    .required('Prior Experience is required'),
  skill_and_experience: Yup.array()
    .of(
      Yup.object().shape({
        skill: Yup.string().required('Skill is required'),
        experience: Yup.string().required('Experience is required')
      })
    )
    .min(1, 'At least one skill is required')
});

const DetailsSubmission = ({ handleSubmitDetails, isSubmitted }) => {
  const { userDetails } = useSelector((state) => state.interview);

  const handleSubmit = async (values) => {
    // Ensure that the values are parsed to integers
    values.age = parseInt(values.age);
    values.prior_experience = parseInt(values.prior_experience);

    // Handle form submission
    handleSubmitDetails(values);
  };

  return (
    <Fade in={true}>
      <div style={{ pointerEvents: isSubmitted ? 'none' : 'all' }}>
        <Box>
          <Formik
            initialValues={
              userDetails
                ? { ...userDetails }
                : {
                    name: '',
                    email: '',
                    phone_number: '',
                    father_name: '',
                    age: '',
                    university: '',
                    position_applied_for: '',
                    prior_experience: '',
                    skill_and_experience: [
                      {
                        skill: '',
                        experience: ''
                      }
                    ]
                  }
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={gridSpacing}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('name')}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      required
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
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="phone_number"
                      name="phone_number"
                      label="Phone Number"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('phone_number')}
                      error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                      helperText={formik.touched.phone_number && formik.errors.phone_number}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="fatherName"
                      name="father_name"
                      label="Father Name"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('father_name')}
                      error={formik.touched.father_name && Boolean(formik.errors.father_name)}
                      helperText={formik.touched.father_name && formik.errors.father_name}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="age"
                      name="age"
                      label="Age"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('age')}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      helperText={formik.touched.age && formik.errors.age}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="university"
                      name="university"
                      label="University"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('university')}
                      error={formik.touched.university && Boolean(formik.errors.university)}
                      helperText={formik.touched.university && formik.errors.university}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="position_applied_for"
                      name="position_applied_for"
                      label="Postion Applied For"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('position_applied_for')}
                      error={formik.touched.position_applied_for && Boolean(formik.errors.position_applied_for)}
                      helperText={formik.touched.position_applied_for && formik.errors.position_applied_for}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      id="prior_experience"
                      name="prior_experience"
                      label="Prior Experience"
                      required
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      sx={{
                        my: 2
                      }}
                      {...formik.getFieldProps('prior_experience')}
                      error={formik.touched.prior_experience && Boolean(formik.errors.prior_experience)}
                      helperText={formik.touched.prior_experience && formik.errors.prior_experience}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FieldArray name="skill_and_experience">
                      {({ push, remove }) => (
                        <Box>
                          {formik.values.skill_and_experience?.map((skillExperience, index) => (
                            <Box style={{ display: 'flex', alignItems: 'center', width: '70%' }} key={index}>
                              <Field
                                name={`skill_and_experience[${index}].skill`}
                                label="Skill"
                                required
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                sx={{
                                  my: 2
                                }}
                                as={TextField}
                                error={
                                  formik.touched.skill_and_experience &&
                                  formik.touched.skill_and_experience[index] &&
                                  Boolean(formik.errors.skill_and_experience) &&
                                  Boolean(formik.errors.skill_and_experience[index]?.skill)
                                }
                                helperText={
                                  formik.touched.skill_and_experience &&
                                  formik.touched.skill_and_experience[index] &&
                                  formik.errors.skill_and_experience &&
                                  formik.errors.skill_and_experience[index]?.skill
                                }
                              />
                              <Field
                                name={`skill_and_experience[${index}].experience`}
                                label="Experience"
                                required
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                sx={{
                                  my: 2,
                                  ml: 2
                                }}
                                as={TextField}
                                error={
                                  formik.touched.skill_and_experience &&
                                  formik.touched.skill_and_experience[index] &&
                                  Boolean(formik.errors.skill_and_experience) &&
                                  Boolean(formik.errors.skill_and_experience[index]?.experience)
                                }
                                helperText={
                                  formik.touched.skill_and_experience &&
                                  formik.touched.skill_and_experience[index] &&
                                  formik.errors.skill_and_experience &&
                                  formik.errors.skill_and_experience[index]?.experience
                                }
                              />
                              {index > 0 && (
                                <Button sx={{ ml: 1 }} type="button" variant="contained" color="secondary" onClick={() => remove(index)}>
                                  Remove
                                </Button>
                              )}
                            </Box>
                          ))}
                          <Button
                            disabled={isSubmitted || formik.errors.skill_and_experience ? true : false}
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => push({ skill: '', experience: '' })}
                          >
                            Add Skill and Experience
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Button
                      disabled={!formik.isValid || formik.isSubmitting || isSubmitted}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </Fade>
  );
};

DetailsSubmission.propTypes = {
  handleSubmitDetails: PropTypes.func,
  isSubmitted: PropTypes.bool
};

export default DetailsSubmission;
