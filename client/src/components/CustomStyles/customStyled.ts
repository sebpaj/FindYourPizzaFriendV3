import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const TextFieldStyled = styled(TextField)({
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
