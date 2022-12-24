/** @format */

import { Link } from "react-router-dom";
import { create_guestuser } from "../actions/auth";
import { ButtonGroup, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  username: yup.string("Enter your Username").required("Username is required"),
  email: yup
    .string("Enter your Email")
    .email("email format incorrect")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required").min(4),
  password2: yup
    .string()
    .required("Password does not match")
    .oneOf([yup.ref("password"), null], "passwords must match")
});

const Guestsignup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { username, email, password, password2 } = values;
        dispatch(create_guestuser({ username, email, password, password2 }));
    },
  });

  return (
    <Container style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Typography
        variant='h4'
        align='center'
        component='h1'
        style={{ padding: 10 }}
      >
        User register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify='flex-start' alignItems='center' spacing={2}>
          <Grid item xs={10} md={8}>
            <TextField
              fullWidth
              id='username'
              name='username'
              label='Username'
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              style={{ marginTop: 15 }}
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField
              fullWidth
              id='password2'
              name='password2'
              label='Confirm your Password'
              type='password'
              value={formik.values.password2}
              onChange={formik.handleChange}
              error={
                formik.touched.password2 &&
                Boolean(formik.errors.password2)
              }
              helperText={
                formik.touched.password2 && formik.errors.password2
              }
            />
          </Grid>
          <Grid item xs={8} md={8}>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
            >
              <Button type='submit'>Sign up</Button>
              <Button>
                <Link to='/'>Back</Link>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Guestsignup;
