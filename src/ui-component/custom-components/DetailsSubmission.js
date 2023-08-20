import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Fade, Grid, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  father_name: Yup.string().required("Father's Name is required"),
  age: Yup.number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(18, 'Minimum age is 18')
    .required('Age is required'),
  university: Yup.string().required('University is required'),
  prior_experience: Yup.number()
    .typeError('Prior Experience must be a number')
    .positive('Prior Experience must be a positive number')
    .integer('Prior Experience must be an integer')
    .required('Prior Experience is required'),
  skill_and_experience: Yup.array().of(Yup.string().required('Skill & Experience is required')).min(1, 'At least one skill is required')
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
                    father_name: '',
                    age: '',
                    university: '',
                    prior_experience: '',
                    skill_and_experience: ['']
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
                  <Grid item lg={6} md={6} sm={6} xs={12}>
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
                  <Grid item lg={6} md={6} sm={6} xs={12}>
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
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FieldArray name="skill_and_experience">
                      {({ push, remove }) => (
                        <Box>
                          {formik.values.skill_and_experience.map((_, index) => (
                            <Box style={{ display: 'flex', alignItems: 'center' }} key={index}>
                              <Field
                                name={`skill_and_experience[${index}]`}
                                label="Skill And Experience"
                                placeholder="Skill, Experience"
                                required
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                sx={{
                                  my: 2
                                }}
                                as={TextField}
                              />
                              {index > 0 && (
                                <Button sx={{ ml: 1 }} type="button" variant="contained" color="secondary" onClick={() => remove(index)}>
                                  Remove
                                </Button>
                              )}
                            </Box>
                          ))}
                          <Button disabled={isSubmitted} type="button" variant="contained" color="secondary" onClick={() => push('')}>
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
