import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { validateEmail } from "./utils";

const themeDark = createTheme({
  palette: {
    text: {
      primary: "#1E88E5",
    },
  },
});

interface Props {
  setIsLoggedIn: (arg0: boolean) => void;
  setEmailAddress: (arg0: string) => void;
}

export default function SignInSide(props: Props) {
  const { setIsLoggedIn, setEmailAddress } = props;

  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const pin = data.get("password");
    if (!email || !pin) {
      console.error("Email and pin are required");
      return;
    } else if (!validateEmail(email)) {
      console.error("Email is not valid");
      setError(true);
      return;
    } else {
      setIsLoggedIn(true);
      setEmailAddress(email);
    }
  };

  return (
    <ThemeProvider theme={themeDark}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", background: "black" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          bgcolor="#121212"
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              Find Your Pizza Friend!
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LocalPizzaIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={error}
                InputProps={{
                  style: {
                    borderColor: error ? "red" : "initial",
                    backgroundColor: "#333",
                    font: "#1E88E5",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Pin"
                type="password"
                id="password"
                autoComplete="current-password"
                inputProps={{
                  maxLength: 6,
                  backgroundColor: "#333",
                  font: "#1E88E5",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
