import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "../api/axios";

const REGISTER_USER_URL = "/api/v1/Authentication/RegisterUser";

const registerSchema = object({
  firstName: string()
    .nonempty("First Name is required")
    .max(32, "First Name must be less than 100 characters"),
  lastName: string()
    .nonempty("Last Name is required")
    .max(32, "Last Name must be less than 100 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/\d/, "Password must contain at least one digit"),
});

type registerInput = TypeOf<typeof registerSchema>;

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        ConSpace
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<registerInput> = async (values) => {
    setLoading(true);

    try {
      await axios.post(
        REGISTER_USER_URL,
        JSON.stringify({
          email: values.email,
          password: values.password,
          firstname: values.firstName,
          lastname: values.lastName,
          username: values.email.replace(/[^a-zA-Z0-9]/g, ""),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      // console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoComplete="given-name"
                autoFocus
                error={!!errors["firstName"]}
                helperText={
                  errors["firstName"] ? errors["firstName"].message : ""
                }
                {...register("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                error={!!errors["firstName"]}
                helperText={
                  errors["lastName"] ? errors["lastName"].message : ""
                }
                {...register("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors["email"]}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                autoComplete="new-password"
                error={!!errors["password"]}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handlePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
