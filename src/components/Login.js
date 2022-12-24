/** @format */

import { Link } from "react-router-dom";
import { login } from "../actions/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { ButtonGroup, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
// import Alert from "react-bootstrap/Alert";
// import { useState } from "react";

const validationSchema = yup.object({
  username: yup.string("Enter your Username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

function Login() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      dispatch(login({ username, password }));
    },
  });

  // const [error, setError] = useState(false);

  // const showError = () => {
  //   setError(true);
  //   setTimeout(() => {
  //     setError(false);
  //   }, 3000);
  //}
  return (
    <Container style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      {/* {error && <Alert variant="danger">Credenciales incorrectas</Alert>} */}
      <Typography
        variant='h4'
        align='center'
        component='h1'
        style={{ padding: 10 }}
      >
        Login
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
          <Grid item xs={8} md={8}>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
            >
              <Button type='submit'>Submit</Button>
              <Button>
                <Link to='/'>Back</Link>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
