import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState } from "react";

import { TextFieldStyled } from "../CustomStyles/customStyled";
import { validateEmail } from "./utils";
import { useMutation } from "@apollo/client";

import { CREATE_USER_MUTATION } from "../../queries/welcomePage/mutations";

interface Props {
  handleLinkClick: () => void;
  setEmailAddress: (email: string) => void;
  setIsLoggedIn: (arg0: boolean) => void;
}

export default function CreateAccount(props: Props) {
  const { handleLinkClick, setEmailAddress, setIsLoggedIn } = props;
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
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");

    if (!email || !pin || !firstName || !lastName) {
      console.error("Missing required fields");
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
            firstName,
            lastName,
            username: email.split("@")[0],
          },
        },
      }).catch((err) => {
        console.log("Error during creation of user", err);
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
          id="firstName"
          label="First Name"
          name="firstName"
          autoFocus
          autoComplete="off"
          error={error}
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
        <TextFieldStyled
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoFocus
          autoComplete="off"
          error={error}
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
          Create account
        </Button>
      </Box>
      <a href="#" onClick={handleLinkClick}>
        Already have account? Log in
      </a>
    </div>
  );
}
