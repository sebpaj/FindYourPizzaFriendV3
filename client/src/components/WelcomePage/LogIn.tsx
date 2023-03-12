import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TextFieldStyled } from "../CustomStyles/customStyled";
import { useMutation } from "@apollo/client";
import { LOG_IN_MUTATION } from "../../queries/welcomePage/mutations";
import { validateEmail } from "./utils";

interface Props {
  handleLinkClick: () => void;
  setEmailAddress: (email: string) => void;
  setIsLoggedIn: (arg0: boolean) => void;
}

export default function LoginPage(props: Props) {
  const { handleLinkClick, setEmailAddress, setIsLoggedIn } = props;
  const [error, setError] = useState(false);

  const [logIn, { loading, error: logInError }] = useMutation(LOG_IN_MUTATION, {
    onCompleted: (data) => {
      if (!logInError) {
        setEmailAddress(data.login.email);
        setIsLoggedIn(true);
      }
    },
  });

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
      logIn({
        variables: {
          email,
          pin: Number(pin),
        },
      }).catch((err) => {
        console.log("Error during logging of user", err);
      });
    }
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {loading && <p>Loading...</p>}
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
          Log In
        </Button>
      </Box>
      <a href="/#" onClick={handleLinkClick}>
        Do not have account? Create it here
      </a>
    </div>
  );
}
