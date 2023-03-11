import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TextFieldStyled } from "../CustomStyles/customStyled";

interface Props {
  handleLinkClick: () => void;
}

export default function LoginPage(props: Props) {
  const { handleLinkClick } = props;
  const [error, setError] = useState(false);
  return (
    <div>
      <Box
        component="form"
        noValidate
        onSubmit={() => console.log("submit")}
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
          Log In
        </Button>
      </Box>
      <a href="#" onClick={handleLinkClick}>
        Do not have account? Create it here
      </a>
    </div>
  );
}
