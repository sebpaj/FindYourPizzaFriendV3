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
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { validateEmail } from "./utils";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../queries/signin/signin";

const themeDark = createTheme({
  palette: {
    text: {
      primary: "#1E88E5",
    },
  },
});

const TextFieldStyled = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1E88E5",
    font: "#1E88E5",
  },
  "& .MuiInputBase-root": {
    color: "#1E88E5",
    font: "#1E88E5",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1E88E5",
    color: "#1E88E5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1E88E5",
      color: "#1E88E5",
    },
    "&:hover fieldset": {
      borderColor: "#1E88E5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1E88E5",
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

  const [createUser, { loading, error: createUserError }] = useMutation(
    CREATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        if (!createUserError) {
          setEmailAddress(data.createUser.email);
          setIsLoggedIn(true);
        }
      },
    }
  );

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
      createUser({
        variables: {
          user: {
            email,
            pin: Number(pin),
            firstName: "",
            lastName: "",
            username: "",
          },
        },
      }).catch((err) => {
        console.log("Error during creation of user", err);
      });
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
            backgroundImage: "url(http://localhost:3001/random-image)",
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
              {loading && <p>Loading...</p>}
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LocalPizzaIcon />
            </Avatar>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextFieldStyled
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                error={error}
                InputLabelProps={{
                  style: {
                    color: error ? "red" : "#1E88E5",
                  },
                }}
                InputProps={{
                  style: {
                    borderColor: error ? "red" : "initial",
                    color: error ? "red" : "#1E88E5",
                  },
                }}
              />
              <TextFieldStyled
                margin="normal"
                required
                fullWidth
                name="password"
                label="Pin"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: {
                    color: "#1E88E5",
                  },
                }}
                inputProps={{
                  maxLength: 6,
                  font: "#1E88E5",
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In / Sign up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
