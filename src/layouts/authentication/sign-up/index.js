import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

const SignUpSide = () => {
  const profiles = [
    {
      value: "student",
      label: "Student",
    },
    {
      value: "teacher",
      label: "Teacher",
    },
  ];
  const [profile, setProfile] = React.useState("student");

  const handleChange = (event) => {
    setProfile(event.target.value);
  };

  const handleSubmit = (event) => {
    setProfile(event.target.value);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
      first_name: data.get("firstname"),
      last_name: data.get("lastname"),
      email: data.get("email"),
      user_type: profile,
      password_confirm: data.get("cnfpassword"),
    });

    axios
      .post("http://172.16.63.149:8080/auth/api/v1/register/", {
        username: data.get("username"),
        password: data.get("password"),
        first_name: data.get("firstname"),
        last_name: data.get("lastname"),
        email: data.get("email"),
        user_type: profile,
        password_confirm: data.get("cnfpassword"),
      })
      .then(function (response) {
        console.log("user created");
        console.log(response);
        alert("Account Created Successfully");
        window.location.href = "/";
      })
      .catch(function (error) {
        if (error.response) {
          alert("Try again.");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                halfWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoFocus
              />
              <TextField
                sx={{ ml: 2 }}
                margin="normal"
                required
                halfWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                halfWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                sx={{ ml: 2 }}
                margin="normal"
                id="outlined-select-profile"
                select
                halfWidth
                label="Select"
                value={profile}
                onChange={handleChange}
                helperText="Please select your profile"
              >
                {profiles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                id="cnfpassword"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Copyright sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignUpSide;
