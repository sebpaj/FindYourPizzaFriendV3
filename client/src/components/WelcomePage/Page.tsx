import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateAccount from "./CreateAccount";
import LoginPage from "./LogIn";

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

export default function OpeningPage(props: Props) {
  const { setIsLoggedIn, setEmailAddress } = props;

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleLinkClick = () => {
    setIsCreatingAccount(!isCreatingAccount);
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
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LocalPizzaIcon />
            </Avatar>

            <div>
              {isCreatingAccount ? (
                <CreateAccount
                  handleLinkClick={handleLinkClick}
                  setIsLoggedIn={setIsLoggedIn}
                  setEmailAddress={setEmailAddress}
                />
              ) : (
                <LoginPage
                  handleLinkClick={handleLinkClick}
                  setIsLoggedIn={setIsLoggedIn}
                  setEmailAddress={setEmailAddress}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
